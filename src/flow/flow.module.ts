import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowEntity } from './flow.entity';
import { FlowResolver } from './flow.resolver';
import { FlowService } from './flow.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlowEntity])],
  providers: [FlowService, FlowResolver],
})
export class FlowModule {}
