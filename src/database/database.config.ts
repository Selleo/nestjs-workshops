import { registerAs } from '@nestjs/config';

export const DatabaseConfig = registerAs('database', () => ({
  host: process.env.TYPEORM_HOST,

  database: process.env.TYPEORM_DATABASE,

  username: process.env.TYPEORM_USERNAME,

  password: process.env.TYPEORM_PASSWORD,

  port: parseInt(process.env.TYPEORM_PORT, 10) || 3306,
}));
