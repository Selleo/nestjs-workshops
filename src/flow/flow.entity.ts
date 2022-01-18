import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { FlowState } from './flow.type';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
@ObjectType('Flow')
@Entity({ name: 'flow' })
export class FlowEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field(() => FlowState)
  @Column({
    type: 'enum',
    default: FlowState.DRAFT,
    enum: FlowState,
  })
  state: FlowState;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.flows)
  user: UserEntity;
}
