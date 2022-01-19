import { registerEnumType } from '@nestjs/graphql';

export enum PdfFileState {
  UPLOADED = 'uploaded',
  PENDING = 'pending',
  FAILED_UPLOAD = 'failed_upload',
}

registerEnumType(PdfFileState, {
  name: 'PdfFileStateEnum',
});
