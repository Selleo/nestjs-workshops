import {
  Args,
  Query,
  Mutation,
  Resolver,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { FlowEntity } from './flow.entity';
import { UseGuards } from '@nestjs/common';
import { UserGraphqlAuthGuard } from '../auth/guards/user-graphql-auth.guard';
import { CurrentUserGql } from '../auth/current-user-gql.decorator';
import { UserEntity } from '../user/user.entity';
import { FlowCreateDto, FlowUpdateDto } from './flow.dto';
import { FlowService } from './flow.service';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { FLOW_EVENTS } from './flow.type';

@Resolver(() => FlowEntity)
export class FlowResolver {
  constructor(private flowService: FlowService, private pubsub: RedisPubSub) {}

  @UseGuards(UserGraphqlAuthGuard)
  @Mutation(() => FlowEntity)
  flowCreate(
    @Args('flow') flowDto: FlowCreateDto,
    @CurrentUserGql() currentUser: UserEntity,
  ) {
    return this.flowService.create(flowDto, currentUser);
  }

  @UseGuards(UserGraphqlAuthGuard)
  @Mutation(() => FlowEntity)
  async flowUpdate(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args('flow') flowDto: FlowUpdateDto,
    @CurrentUserGql() currentUser: UserEntity,
  ) {
    const updatedFlow = await this.flowService.update(id, flowDto, currentUser);

    await this.pubsub.publish(FLOW_EVENTS.flowUpdated, {
      [FLOW_EVENTS.flowUpdated]: updatedFlow,
    });

    return updatedFlow;
  }

  @UseGuards(UserGraphqlAuthGuard)
  @Mutation(() => FlowEntity)
  async flowDelete(
    @Args({ name: 'id', type: () => ID }) id: number,
    @CurrentUserGql() currentUser: UserEntity,
  ): Promise<FlowEntity> {
    return this.flowService.delete(id, currentUser);
  }

  @UseGuards(UserGraphqlAuthGuard)
  @Query(() => [FlowEntity])
  flows(@CurrentUserGql() currentUser: UserEntity): Promise<FlowEntity[]> {
    return this.flowService.findAllForUser(currentUser);
  }

  @UseGuards(UserGraphqlAuthGuard)
  @Query(() => FlowEntity)
  flow(
    @Args({ name: 'id', type: () => ID }) id: number,
    @CurrentUserGql() currentUser: UserEntity,
  ): Promise<FlowEntity> {
    return this.flowService.findForUser(id, currentUser);
  }

  @Subscription(() => FlowEntity, {
    name: FLOW_EVENTS.flowUpdated,
    resolve: (payload) => {
      console.log('resolved payload: ', payload);
      return {
        ...payload[FLOW_EVENTS.flowUpdated],
        name: 'X',
      };
    },
    filter: (payload, variables) => {
      console.log('FILTER payload: ', payload);
      console.log('FILTER variables: ', variables);

      return payload[FLOW_EVENTS.flowUpdated].id.toString() === variables.id;
    },
  })
  flowUpdatedHandler(@Args('id', { type: () => ID }) id: number) {
    console.log('id: ', id);
    return this.pubsub.asyncIterator(FLOW_EVENTS.flowUpdated);
  }
}
