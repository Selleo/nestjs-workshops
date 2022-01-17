import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthConfig } from './auth.config';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { SessionService } from './session.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity]),
    ConfigModule.forFeature(AuthConfig),
    UserModule,
  ],
  providers: [AuthService, AuthResolver, SessionService],
  exports: [AuthService],
})
export class AuthModule {}
