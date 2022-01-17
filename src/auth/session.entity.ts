import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'session' })
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  expiresAt: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.sessions)
  user: UserEntity;
}
