import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { FlowEntity } from './flow.entity';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { PdfFileState } from './pdf-file.type';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({ name: 'pdf_file' })
@Unique(['flow', 'filename'])
export class PdfFileEntity extends BaseEntity {
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
  filename: string;

  @Field()
  @Column({ type: 'text' })
  content: string;

  @Field(() => PdfFileState, { defaultValue: PdfFileState.PENDING })
  @Column({
    type: 'enum',
    enum: PdfFileState,
    default: PdfFileState.PENDING,
  })
  state: PdfFileState;

  @ManyToOne(() => FlowEntity, (flow) => flow.pdfFiles)
  flow: FlowEntity;
}
