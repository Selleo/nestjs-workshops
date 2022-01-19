import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { PdfFileEntity } from './pdf-file.entity';

@InputType()
export class PdfFileCreateDto extends PickType(PdfFileEntity, [
  'filename',
  'content',
]) {}

@InputType()
export class PdfFileUpdateDto extends PartialType(PdfFileCreateDto) {}
