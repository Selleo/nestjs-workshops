import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findUserByEmail(email);

    if (!user || !user.isPasswordValid(password)) {
      return null;
    }

    return user;
  }
}
