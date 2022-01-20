import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { FileStorageService } from '../file-storage/file-storage.service';
import { PdfFileService } from './pdf-file.service';

@Console()
@Injectable()
export class PdfFileConsole {
  constructor(
    private pdfFileService: PdfFileService,
    private fileStorageService: FileStorageService,
  ) {}

  @Command({
    command: 'send-pdf-file-to-storage <pdfFileId>',
    description:
      'The command sends the pdf files with ID pdfFileID to the external storage.',
  })
  async sendPdfFileToStorage(pdfFileId: number) {
    console.log(`Pdf File ID: ${pdfFileId}`);

    const pdfFile = await this.pdfFileService.find({ id: pdfFileId });

    if (!pdfFile) {
      return console.log('The PDF file was not found!');
    }

    console.log(`Found file: ${pdfFile.id} - ${pdfFile.filename}`);

    await this.fileStorageService.uploadFile(pdfFile.filename, pdfFile.content);

    console.log(`Uploaded file ${pdfFileId} to the storage`);
  }
}
