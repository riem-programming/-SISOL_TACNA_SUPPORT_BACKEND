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
  character_count!: number;

  @Column()
  code!: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateddAt!: Date;
}
