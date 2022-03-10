import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DumpRequestPayloadDto {
  @ApiProperty({
    required: true,
    example: 'voting',
    description: 'The name of service',
  })
  @IsString()
  @IsNotEmpty()
  readonly service: string;
}
