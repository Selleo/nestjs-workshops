import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/database/database.config';
import { loadOrmConfig } from 'src/database/load-orm-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfig)],
      inject: [DatabaseConfig.KEY],
      useFactory: (databaseConfig: ConfigType<typeof DatabaseConfig>) =>
        loadOrmConfig(databaseConfig),
    }),
  ],
})
export class DatabaseModule {}
