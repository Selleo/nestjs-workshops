import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user.type';
import { SessionEntity } from '../auth/session.entity';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import * as crypto from 'crypto';

@InputType({ isAbstract: true })
@ObjectType('User')
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Field(() => ID)
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
  @Index({ unique: true })
  email: string;

  @Field()
  @Column()
  name: string;

  @Field(() => UserRole)
  @Column()
  role: UserRole;

  @Field({ nullable: true })
  @Column({ name: 'full_name', nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pictureUrl?: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];

  set password(password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);
  }

  isPasswordValid(password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return this.hash === hash;
  }
}
