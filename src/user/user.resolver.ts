import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserCreateDto } from './user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => UserEntity)
  async userCreate(@Args('user') userDto: UserCreateDto): Promise<UserEntity> {
    return this.userService.create(userDto);
  }
}
