import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

import { AuthUserMiddleware } from '@app/middlewares/auth-user.middleware';
import { PingModule } from '@app/modules/ping/ping.module';
import { DumpModule } from '@app/modules/dump/dump.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(process.cwd(), 'config', '**/!(*.d).{ts,js}'),
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database'),
    }),
    PingModule,
    DumpModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    return consumer
      .apply(AuthUserMiddleware)
      .forRoutes({ path: '', method: RequestMethod.ALL });
  }
}
