import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DumpRequestResponseDto {
  @ApiProperty({
    example: 'Pending',
    description: 'The status of request',
  })
  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @ApiProperty({
    example: 'Your request is in a process',
    description: 'Description',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    example: 111,
    description: 'The ID of request',
  })
  @IsNumber()
  readonly id: number;
}
