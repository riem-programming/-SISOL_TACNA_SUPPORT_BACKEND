import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'support_mode' })
export class SupportMode {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  short_name!: string;

  @Column()
  long_name!: string;

  @Column({ unique: true })
  code!: string;

  @Column()
  emoji!: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateddAt!: Date;
}
