import { Injectable, Logger } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';

@Injectable()
export class FileStorageServiceMock
  implements Pick<FileStorageService, keyof FileStorageService>
{
  private readonly logger = new Logger(FileStorageServiceMock.name);

  async uploadFile(filename: string, content: string) {
    this.logger.log(`MOCK uploadFile ${filename}`);
  }

  async downloadFile(filename: string) {
    this.logger.log(`MOCK downloadFile ${filename}`);

    return {
      filename: 'fake-filename.txt',
      content: 'fake-content',
    };
  }

  async deleteFile(filename: string) {
    this.logger.log(`MOCK deleteFile ${filename}`);
  }

  async updateFile(filename: string, content: string) {
    this.logger.log(`MOCK updateFile ${filename}`);
  }
}
