import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AuthConfig } from './auth.config';
import { UserModule } from '../user/user.module';
import { SessionService } from './session.service';
import { PassportModule } from '@nestjs/passport';
import { UserGraphqlAuthGuard } from './guards/user-graphql-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([SessionEntity]),
    PassportModule,
    ConfigModule.forFeature(AuthConfig),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(AuthConfig)],
      inject: [AuthConfig.KEY],
      useFactory: (authConfig: ConfigType<typeof AuthConfig>) => ({
        secret: authConfig.jwtSecret,
        signOptions: { expiresIn: authConfig.sessionExpirationTime },
      }),
    }),
  ],
  providers: [
    AuthService,
    SessionService,
    LocalStrategy,
    UserGraphqlAuthGuard,
    LocalAuthGuard,
    JwtStrategy,
  ],
  exports: [AuthService, UserGraphqlAuthGuard, PassportModule, JwtStrategy],
})
export class AuthModule {}
