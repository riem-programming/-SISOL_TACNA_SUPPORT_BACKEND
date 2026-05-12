import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'document_type' })
export class DocumentType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  long_name!: string;

  @Column()
  short_name!: string;

  @Column()
  charcter_count!: number;

  @Column()
  code!: string;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
