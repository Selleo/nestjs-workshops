import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowEntity } from './flow.entity';
import { FlowResolver } from './flow.resolver';
import { FlowService } from './flow.service';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { PdfFileService } from './pdf-file.service';
import { PdfFileEntity } from './pdf-file.entity';
import { PdfFileResolver } from './pdf-file.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlowEntity, PdfFileEntity]),
    FileStorageModule,
  ],
  providers: [FlowService, FlowResolver, PdfFileService, PdfFileResolver],
})
export class FlowModule {}
