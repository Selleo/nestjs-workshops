import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AuthConfig } from './auth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
    @Inject(AuthConfig.KEY)
    private authConfig: ConfigType<typeof AuthConfig>,
  ) {}

  async createForUser(user: UserEntity): Promise<SessionEntity> {
    const session = this.sessionRepository.create({ user });

    session.expiresAt = new Date(
      new Date().getTime() + this.authConfig.sessionExpirationTime,
    );

    return session.save();
  }
}
