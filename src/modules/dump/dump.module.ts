import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DumpService } from './dump.service';
import { DumpController } from './dump.controller';
import DbConfigs from '@app/db/entities/db-configs.entity';
import DumpRequests from '@app/db/entities/dump-requests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DbConfigs, DumpRequests])],
  providers: [DumpService],
  controllers: [DumpController],
  exports: [DumpService],
})
export class DumpModule {}
