import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FlowModule } from './flow/flow.module';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { RedisConfig } from './redis/redis.config';
import { PubsubModule } from './pubsub/pubsub.module';
import { FileStorageModule } from './file-storage/file-storage.module';
import { ConsoleModule } from 'nestjs-console';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.test', '.env'] }),
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule.forFeature(RedisConfig)],
      inject: [RedisConfig.KEY],
      useFactory(redisConfig: ConfigType<typeof RedisConfig>) {
        const config: RedisModuleOptions = {
          url: redisConfig.redisUrl,
        };

        return [
          { name: 'client', ...config },
          { name: 'subscriber', ...config },
        ];
      },
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule.forFeature(RedisConfig)],
      isGlobal: true,
      inject: [RedisConfig.KEY],
      useFactory: (redisConfig: ConfigType<typeof RedisConfig>) => ({
        store: redisStore,
        url: redisConfig.redisUrl,
        ttl: 60,
      }),
    }),
    ConsoleModule,
    AuthModule,
    UserModule,
    FlowModule,
    PubsubModule,
    FileStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
