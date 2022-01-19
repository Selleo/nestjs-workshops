import { registerEnumType } from '@nestjs/graphql';

export enum FlowState {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_process',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
}

registerEnumType(FlowState, { name: 'FlowStateEnum' });

export enum FLOW_EVENTS {
  flowUpdated = 'flowUpdated',
}
