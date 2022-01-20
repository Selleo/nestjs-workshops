import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowEntity } from './flow.entity';
import { Repository } from 'typeorm';
import { PdfFileEntity } from './pdf-file.entity';
import { PdfFileCreateDto, PdfFileUpdateDto } from './pdf-file.dto';
import { FileStorageService } from '../file-storage/file-storage.service';
import { Cache } from 'cache-manager';

@Injectable()
export class PdfFileService {
  constructor(
    @InjectRepository(PdfFileEntity)
    private pdfFileRepository: Repository<PdfFileEntity>,
    private fileStorage: FileStorageService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(
    flowDto: PdfFileCreateDto,
    flow: FlowEntity,
  ): Promise<PdfFileEntity> {
    const pdfFile = this.pdfFileRepository.create({ ...flowDto, flow });

    return pdfFile.save();
  }

  async update(
    id: number,
    flow: FlowEntity,
    pdfFileDto: PdfFileUpdateDto,
  ): Promise<PdfFileEntity> {
    await this.pdfFileRepository.update({ id, flow }, { ...pdfFileDto });

    return this.pdfFileRepository.findOne({ id, flow });
  }

  async delete(id: number, flow: FlowEntity): Promise<PdfFileEntity> {
    const pdfFile = await this.pdfFileRepository.findOne({ id, flow });

    await pdfFile.remove();
    pdfFile.id = id;

    return pdfFile;
  }

  async find(conditions: Partial<PdfFileEntity>): Promise<PdfFileEntity> {
    return this.pdfFileRepository.findOne(conditions);
  }

  async uploadToStorage(pdfFile: PdfFileEntity) {
    await this.fileStorage.uploadFile(pdfFile.filename, pdfFile.content);
  }

  async downloadFromStorage(pdfFile: PdfFileEntity): Promise<string> {
    const cacheKey = `pdf-file-downloaded-file-${pdfFile.filename}`;
    const cachedResult = await this.cacheManager.get<string>(cacheKey);

    if (cachedResult) return cachedResult;

    const fileEntry = await this.fileStorage.downloadFile(pdfFile.filename);

    if (!fileEntry)
      throw new BadRequestException('The file was not uploaded to the storage');

    await this.cacheManager.set<string>(cacheKey, fileEntry.content);

    return fileEntry.content;
  }
}
