import { Injectable, Logger } from '@nestjs/common';

export class FileEntry {
  filename: string;

  content: string;
}

@Injectable()
export class FileStorageService {
  private fileEntries: FileEntry[] = [];

  private readonly logger = new Logger(FileStorageService.name);

  async uploadFile(filename: string, content: string) {
    await this.delay();
    this.randomFailure('The file could not be uploaded');
    this.logger.log(`Uploaded file: ${filename}`);
    this.fileEntries.push({ filename, content });
  }

  async downloadFile(filename: string) {
    await this.delay();
    this.randomFailure('The file could not be downloaded');
    this.logger.log(`Downloaded file: ${filename}`);
    return this.fileEntries.find(
      (fileEntry) => fileEntry.filename === filename,
    );
  }

  async deleteFile(filename: string) {
    await this.delay();

    this.randomFailure('The file could not be deleted from the server');
    this.logger.log(`Deleted file: ${filename}`);

    this.fileEntries = this.fileEntries.filter(
      (fileEntry) => fileEntry.filename !== filename,
    );
  }

  async updateFile(filename: string, content: string) {
    await this.delay();

    this.randomFailure('The file could not be updated in the storage server');
    this.logger.log(`Updated file: ${filename}`);

    const fileEntry = this.fileEntries.find(
      (fileEntry) => fileEntry.filename === filename,
    );

    fileEntry.content = content;
  }

  private async delay() {
    const randomDelay = Math.random() * (10000 - 5000) + 5000;
    await new Promise((resolve) => setTimeout(resolve, randomDelay));
  }

  private randomFailure(message: string) {
    if (Math.random() <= 0.5) {
      throw new Error(message);
    }
  }
}
