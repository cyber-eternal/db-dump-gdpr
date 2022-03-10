import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DbConfigs from '@app/db/entities/db-configs.entity';
import DumpRequests from '@app/db/entities/dump-requests.entity';
import { getDump } from '@app/utils/mysql-dump';
import { DumpStatusEnum } from '@app/enums/dump-status.enum';

const dumpDirectory: string = process.env.DUMP_DIRECTORY || './tmp';

@Injectable()
export class DumpService {
  constructor(
    @InjectRepository(DbConfigs)
    private readonly dbConfigsRepository: Repository<DbConfigs>,
    @InjectRepository(DumpRequests)
    private readonly dumpRequestsRepository: Repository<DumpRequests>,
  ) {}
  private readonly logger = new Logger(DumpService.name);

  private async dumpProcessing(dbConfig: DbConfigs, id: number) {
    const gzipBuffer = await getDump(dbConfig);

    // generating unique file name like dump-123123123123.sql
    const fileName = `dump-${Date.now()}.sql`;

    const filePath = `${dumpDirectory}/${fileName}.gz`;

    // save dump as a file
    fs.writeFileSync(filePath, gzipBuffer);

    this.logger.log(`File created: ${filePath}`);

    // Update the dump request
    await this.dumpRequestsRepository.update(id, {
      status: DumpStatusEnum.COMPLETED,
      file: filePath,
    });

    this.logger.log(
      `Request id=${id} status is updated to ${DumpStatusEnum.COMPLETED}`,
    );
  }

  public async removeDump(id: number, filePath: string): Promise<void> {
    // mark request as Downloaded
    await this.dumpRequestsRepository.update(id, {
      status: DumpStatusEnum.DOWNLOADED,
    });

    // remove file
    fs.unlinkSync(filePath);
  }

  public async dumpRequest(service: string) {
    service = service.toLowerCase();

    this.logger.log(`Requested database dump for the ${service} service`);

    const dbConfig = await this.dbConfigsRepository.findOne({
      service,
    });

    // handle unknown service
    if (!dbConfig) throw new BadRequestException('Unknown service name');

    // create a dump request
    const { id, status } = await this.dumpRequestsRepository.save({ service });

    // run dump process
    this.dumpProcessing(dbConfig, id);

    return {
      message: 'Request created',
      status,
      id,
    };
  }

  public async getDump(id: number) {
    const dumpRequest = await this.dumpRequestsRepository.findOne(id);

    // handle invalid id
    if (!dumpRequest) throw new BadRequestException('Invalid dump request id');

    // handle terminated requests
    if (dumpRequest.status === DumpStatusEnum.TERMINATED)
      throw new BadRequestException(
        `The dump request by provided id was terminated by the reason: ${dumpRequest.reason} `,
      );

    // handle downloaded requests
    if (dumpRequest.status === DumpStatusEnum.DOWNLOADED)
      throw new BadRequestException('The dump was already downloaded');

    if (dumpRequest.status === DumpStatusEnum.PENDING)
      throw new ConflictException(
        'The request is in a process. Please try later',
      );

    const { file } = dumpRequest;

    // handle unknown file
    if (!file)
      throw new BadRequestException(
        'File not found. Please try to request a dump one more time',
      );

    return file;
  }
}
