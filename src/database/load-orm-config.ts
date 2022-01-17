import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/database/database.config';

export async function loadOrmConfig(
  databaseConfig: ConfigType<typeof DatabaseConfig>,
): Promise<TypeOrmModuleOptions> {
  return {
    type: 'mysql',
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.database,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
    retryAttempts: 1,
    retryDelay: 3000,
  };
}
