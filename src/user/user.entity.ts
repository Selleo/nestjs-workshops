import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user.type';
import { SessionEntity } from '../auth/session.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  role: UserRole;

  @Column({ name: 'full_name', nullable: true })
  fullName?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  pictureUrl?: string;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions: SessionEntity[];
}
