import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowEntity } from './flow.entity';
import { FlowResolver } from './flow.resolver';
import { FlowService } from './flow.service';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { PdfFileService } from './pdf-file.service';
import { PdfFileEntity } from './pdf-file.entity';
import { PdfFileResolver } from './pdf-file.resolver';
import { BullModule } from '@nestjs/bull';
import { PdfFileQueue, PdfFileQueueName } from './pdf-file.queue';
import { RedisConfig } from '../redis/redis.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { PdfFileConsole } from './pdf-file.console';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlowEntity, PdfFileEntity]),
    FileStorageModule,
    BullModule.registerQueueAsync({
      name: PdfFileQueueName,
      imports: [ConfigModule.forFeature(RedisConfig)],
      inject: [RedisConfig.KEY],
      useFactory: (redisConfig: ConfigType<typeof RedisConfig>) => {
        return {
          redis: {
            host: redisConfig.host,
            port: redisConfig.port,
            username: redisConfig.username,
            password: redisConfig.password,
          },
          defaultJobOptions: {
            attempts: 3,
            removeOnComplete: false,
            removeOnFail: false,
          },
        };
      },
    }),
  ],
  providers: [
    FlowService,
    FlowResolver,
    PdfFileService,
    PdfFileResolver,
    PdfFileQueue,
    PdfFileConsole,
  ],
})
export class FlowModule {}
