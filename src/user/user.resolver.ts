import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserCreateDto } from './user.dto';
import { UserService } from './user.service';
import { CurrentUserGql } from '../auth/current-user-gql.decorator';
import { UseGuards } from '@nestjs/common';
import { UserGraphqlAuthGuard } from '../auth/guards/user-graphql-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(UserGraphqlAuthGuard)
  @Query(() => UserEntity)
  async currentUser(
    @CurrentUserGql() currentUser: UserEntity,
  ): Promise<UserEntity> {
    return currentUser;
  }

  @Mutation(() => UserEntity)
  async userCreate(@Args('user') userDto: UserCreateDto): Promise<UserEntity> {
    return this.userService.create(userDto);
  }
}
