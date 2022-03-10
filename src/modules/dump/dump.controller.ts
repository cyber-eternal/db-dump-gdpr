import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import {
  // ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Readable } from 'stream';
import * as fs from 'fs';

import { ApiKeyAccessGuard } from '@app/guards/api-key.guard';
import { DumpRequestPayloadDto } from './dto/dump-request-payload.dto';
import { DumpRequestResponseDto } from './dto/dump-request-response.dto';
import { DumpService } from './dump.service';

const route = 'dump';

@ApiTags(route)
@Controller(route)
export class DumpController {
  constructor(private dumpService: DumpService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request a dump of database' })
  // @ApiBearerAuth()
  @ApiSecurity('x-Gateway-APIKey')
  @ApiOkResponse({ status: HttpStatus.OK, type: DumpRequestResponseDto })
  @UseGuards(ApiKeyAccessGuard)
  public async dumpRequest(
    @Body() body: DumpRequestPayloadDto,
  ): Promise<DumpRequestResponseDto> {
    return this.dumpService.dumpRequest(body.service);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Download a dump of database' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Id of dump request',
    example: 1,
  })
  // @ApiBearerAuth()
  @ApiSecurity('x-Gateway-APIKey')
  @ApiOkResponse({ status: HttpStatus.OK, type: Buffer })
  @UseGuards(ApiKeyAccessGuard)
  public async getDump(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<any> {
    const file = await this.dumpService.getDump(id);

    const buffer = fs.readFileSync(file);

    // set headers
    res.setHeader('Content-type', 'application/gzip');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${file.split('/').pop()}`,
    );

    // create a stream
    const readable = new Readable();

    // tslint:disable-next-line: no-empty
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    readable.pipe(res);

    // run file removing process after downloading
    readable.on('end', () => {
      this.dumpService.removeDump(id, file);
    });
  }
}
