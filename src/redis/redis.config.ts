import { registerAs } from '@nestjs/config';

export const RedisConfig = registerAs('redis', () => {
  const redisHost = process.env.REDIS_HOST || 'localhost';
  const redisPassword = process.env.REDIS_PASSWORD || '';
  const redisPort = parseInt(process.env.REDIS_PORT, 10) || 6379;
  const redisUser = process.env.REDIS_USER || 'default';

  return {
    redisUrl: `redis://${redisUser}:${redisPassword}@${redisHost}:${redisPort}`,
  };
});
