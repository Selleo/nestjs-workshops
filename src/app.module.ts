import { Module } from '@nestjs/common';
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
    AuthModule,
    UserModule,
    FlowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
