import { Global, Module, Scope } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { RedisService } from 'nestjs-redis';

@Global()
@Module({
  providers: [
    {
      scope: Scope.DEFAULT,
      provide: RedisPubSub,
      inject: [RedisService],
      useFactory(redisService: RedisService) {
        const publisher = redisService.getClient('client');
        const subscriber = redisService.getClient('subscriber');

        return new RedisPubSub({
          publisher,
          subscriber,
        });
      },
    },
  ],
  exports: [RedisPubSub],
})
export class PubsubModule {}
