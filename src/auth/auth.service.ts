import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findUserByEmail(email);

    if (!user || !user.isPasswordValid(password)) {
      throw new BadRequestException('auth.invalidEmailOrPassword');
    }

    const session = await this.sessionService.createForUser(user);

    return session.id;
  }
}
