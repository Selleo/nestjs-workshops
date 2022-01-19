import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

@InputType('UserSettingsInput')
@ObjectType()
export class UserSettings {
  @Field({ nullable: true })
  theme?: string;

  @Type(() => Date)
  @IsDate()
  @Field(() => Date, { nullable: true })
  disabledNotificationsAt?: Date;

  @Type(() => Date)
  @IsDate()
  @Field(() => Date, { nullable: true })
  acceptedConsentAt?: Date;

  @Field(() => [String], { nullable: true })
  notifications?: string[];
}
