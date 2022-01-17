import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async authLogin(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    return this.authService.login(email, password);
  }
}
