import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class DbConfigs {
  @ApiProperty({ example: 1, description: 'Primary key' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'document', description: 'The name of service' })
  @Column({ nullable: false, unique: true })
  service: string;

  @ApiProperty({ example: 'mysql', description: 'The type of Database' })
  @Column({ nullable: false })
  type: string;

  @ApiProperty({
    example: 'localhost',
    description: 'The host of Database',
  })
  @Column({ nullable: false })
  host: string;

  @ApiProperty({
    example: 3306,
    description: 'The port of Database',
  })
  @Column({ nullable: false })
  port: number;

  @ApiProperty({ example: 'core', description: 'The name of Database' })
  @Column({ nullable: false })
  db: string;

  @ApiProperty({
    example: 'guest',
    description: 'The password to connect to the Database',
  })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    example: 'guest',
    description: 'The username to connect to the Database',
  })
  @Column({ nullable: false })
  username: string;

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
