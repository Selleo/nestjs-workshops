import { Module } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { FileStorageConfig } from './file-storage.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { FileStorageServiceMock } from './file-storage.service-mock';

@Module({
  imports: [ConfigModule.forFeature(FileStorageConfig)],
  providers: [
    {
      provide: FileStorageService,
      inject: [FileStorageConfig.KEY],
      useFactory: (fileStorageConfig: ConfigType<typeof FileStorageConfig>) => {
        if (fileStorageConfig.useFileStorageMock) {
          return new FileStorageServiceMock();
        }

        return new FileStorageService();
      },
    },
  ],
  exports: [FileStorageService],
})
export class FileStorageModule {}
