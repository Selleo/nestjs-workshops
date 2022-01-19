import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Queue } from 'bull';
import { PdfFileQueueName } from './flow/pdf-file.queue';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/bull-board');

  const pdfFileQueue = app.get<Queue>(`BullQueue_${PdfFileQueueName}`);

  createBullBoard({
    queues: [new BullAdapter(pdfFileQueue)],
    serverAdapter,
  });

  app.use('/bull-board', serverAdapter.getRouter());

  await app.listen(3000);
}
bootstrap();
