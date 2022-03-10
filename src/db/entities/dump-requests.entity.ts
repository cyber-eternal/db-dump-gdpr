import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DumpStatusEnum } from '@app/enums/dump-status.enum';

@Entity()
export default class DumpRequests {
  @ApiProperty({ example: 1, description: 'Primary key' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'document', description: 'The name of service' })
  @Column({ nullable: false })
  service: string;

  @ApiProperty({
    example: 'Completed',
    description: 'The status of job',
    enum: Object.values(DumpStatusEnum),
  })
  @Column({
    nullable: false,
    type: 'enum',
    enum: DumpStatusEnum,
    default: DumpStatusEnum.PENDING,
  })
  status: string;

  @ApiProperty({
    example: './tmp/dumps/dump-12345678.sql.zip',
    description: 'The full path of the file',
  })
  @Column({ nullable: true })
  file: string;

  @ApiProperty({
    example: 'Canceled by admin',
    description: 'Reason for termination',
  })
  @Column({ nullable: true })
  reason: string;

  @ApiProperty({
    example: '2021-04-28 08:32:32.257207',
    description: 'Auto-Generated timestamp on creating a row',
  })
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    example: '2021-04-28 08:32:32.257207',
    description: 'Auto-Generated timestamp on updating a row',
  })
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;
}
