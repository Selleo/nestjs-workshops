import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserResolver],
})
export class UserModule {}
