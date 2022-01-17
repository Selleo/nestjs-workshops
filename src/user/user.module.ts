import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  imports: [UserResolver, TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
