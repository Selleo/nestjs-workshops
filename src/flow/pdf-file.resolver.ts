import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PdfFileEntity } from './pdf-file.entity';
import { UserGraphqlAuthGuard } from '../auth/guards/user-graphql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { PdfFileCreateDto, PdfFileUpdateDto } from './pdf-file.dto';
import { FlowService } from './flow.service';
import { CurrentUserGql } from '../auth/current-user-gql.decorator';
import { UserEntity } from '../user/user.entity';
import { PdfFileService } from './pdf-file.service';

@Resolver(PdfFileEntity)
export class PdfFileResolver {
  constructor(
    private pdfFileService: PdfFileService,
    private flowService: FlowService,
  ) {}

  @UseGuards(UserGraphqlAuthGuard)
  @Mutation(() => PdfFileEntity)
  async pdfFileCreate(
    @Args('pdfFile') pdfFileDto: PdfFileCreateDto,
    @Args({ name: 'flowId', type: () => ID }) flowId: number,
    @CurrentUserGql() currentUser: UserEntity,
  ): Promise<PdfFileEntity> {
    const flow = await this.flowService.findForUser(flowId, currentUser);
    return this.pdfFileService.create(pdfFileDto, flow);
  }

  @UseGuards(UserGraphqlAuthGuard)
  @Mutation(() => PdfFileEntity)
  async pdfFileUpdate(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args('pdfFile') pdfFileDto: PdfFileUpdateDto,
    @Args({ name: 'flowId', type: () => ID }) flowId: number,
    @CurrentUserGql() currentUser: UserEntity,
  ): Promise<PdfFileEntity> {
    const flow = await this.flowService.findForUser(flowId, currentUser);

    return this.pdfFileService.update(id, flow, pdfFileDto);
  }

  @UseGuards(UserGraphqlAuthGuard)
  @Mutation(() => PdfFileEntity)
  async pdfFileDelete(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args({ name: 'flowId', type: () => ID }) flowId: number,
    @CurrentUserGql() currentUser: UserEntity,
  ): Promise<PdfFileEntity> {
    const flow = await this.flowService.findForUser(flowId, currentUser);

    return this.pdfFileService.delete(id, flow);
  }

  @UseGuards(UserGraphqlAuthGuard)
  @Mutation(() => PdfFileEntity)
  async pdfFileUpload(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args({ name: 'flowId', type: () => ID }) flowId: number,
    @CurrentUserGql() currentUser: UserEntity,
  ): Promise<boolean> {
    const flow = await this.flowService.findForUser(flowId, currentUser);
    const pdfFile = await this.pdfFileService.find(id, flow);

    await this.pdfFileService.uploadToStorage(pdfFile);

    return true;
  }

  @UseGuards(UserGraphqlAuthGuard)
  @Query(() => PdfFileEntity)
  async pdfFile(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args({ name: 'flowId', type: () => ID }) flowId: number,
    @CurrentUserGql() currentUser: UserEntity,
  ): Promise<PdfFileEntity> {
    const flow = await this.flowService.findForUser(flowId, currentUser);

    return this.pdfFileService.find(id, flow);
  }
}
