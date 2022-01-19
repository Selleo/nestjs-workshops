import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { Match } from '../util/match.decorator';

@InputType()
export class UserCreateDto extends PickType(UserEntity, [
  'email',
  'name',
  'fullName',
  'settings',
]) {
  @Field()
  password: string;

  @Field()
  @Match('password')
  passwordConfirmation: string;
}

@InputType()
export class UserUpdateDto extends PartialType(
  PickType(UserEntity, ['email', 'name', 'fullName', 'settings']),
) {}

@InputType()
export class UserUpdatePasswordDto {
  @Field()
  password: string;

  @Field()
  @Match('password')
  passwordConfirmation: string;
}
