import { Field, InputType, PickType } from '@nestjs/graphql';
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
