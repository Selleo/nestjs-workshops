import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { PdfFileService } from './pdf-file.service';

export const PdfFileQueueName = 'PdfFileQueueName';

interface UploadPdfFile {
  pdfFileId: number;
}

enum PdfFileQueueProcessors {
  UPLOAD_PDF_FILE = 'UPLOAD_PDF_FILE',
}

@Processor(PdfFileQueueName)
@Injectable()
export class PdfFileQueue {
  constructor(
    @InjectQueue(PdfFileQueueName) private pdfFileQueue: Queue<UploadPdfFile>,
    private pdfFileService: PdfFileService,
  ) {}

  private logger = new Logger(PdfFileQueue.name);

  async enqueueUploadPdfFile(pdfFileId: UploadPdfFile['pdfFileId']) {
    this.logger.log(`#enqueueUploadPdfFile ${pdfFileId}`);

    return this.pdfFileQueue.add(PdfFileQueueProcessors.UPLOAD_PDF_FILE, {
      pdfFileId,
    });
  }

  @Process(PdfFileQueueProcessors.UPLOAD_PDF_FILE)
  async uploadPdfFile(job: Job<UploadPdfFile>) {
    const { pdfFileId } = job.data;

    this.logger.log(`Processing: ${pdfFileId}`);
    await job.log(`Processing: ${pdfFileId}`);

    const pdfFile = await this.pdfFileService.find({ id: pdfFileId });

    await this.pdfFileService.uploadToStorage(pdfFile);
  }
}
