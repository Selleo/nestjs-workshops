import { Args, Query, Mutation, Resolver, ID } from '@nestjs/graphql';
import { FlowEntity } from './flow.entity';
import { UseGuards } from '@nestjs/common';
import { UserGraphqlAuthGuard } from '../auth/guards/user-graphql-auth.guard';
import { CurrentUserGql } from '../auth/current-user-gql.decorator';
import { UserEntity } from '../user/user.entity';
import { FlowCreateDto, FlowUpdateDto } from './flow.dto';
import { FlowService } from './flow.service';

@Resolver(() => FlowEntity)
export class FlowResolver {
  constructor(private flowService: FlowService) {}

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
  flowUpdate(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args('flow') flowDto: FlowUpdateDto,
    @CurrentUserGql() currentUser: UserEntity,
  ) {
    return this.flowService.update(id, flowDto, currentUser);
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
    return this.flowService.findForUser(currentUser);
  }
}
