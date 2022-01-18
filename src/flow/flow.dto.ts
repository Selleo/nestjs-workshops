import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { FlowEntity } from './flow.entity';

@InputType()
export class FlowCreateDto extends PickType(FlowEntity, [
  'name',
  'description',
]) {}

@InputType()
export class FlowUpdateDto extends PartialType(FlowCreateDto) {}
