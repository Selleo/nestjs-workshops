import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { UserEntity } from './user.entity';

@InputType()
export class UserCreateDto extends PickType(UserEntity, [
  'email',
  'name',
  'fullName',
]) {
  @Field()
  password: string;

  @Field()
  passwordConfirmation: string;
}

@InputType()
export class UserUpdateDto extends PartialType(
  PickType(UserEntity, ['email', 'name', 'fullName']),
) {}
