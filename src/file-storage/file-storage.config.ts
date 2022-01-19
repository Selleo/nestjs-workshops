import { registerAs } from '@nestjs/config';

export const FileStorageConfig = registerAs('fileStorage', () => ({
  useFileStorageMock: process.env.USE_FILE_STORAGE_MOCK === 'true',
}));
