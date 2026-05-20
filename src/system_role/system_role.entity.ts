import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'system_role' })
export class SystemRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  long_name!: string;

  @Column()
  short_name!: string;

  @Column({ unique: true })
  code!: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateddAt!: Date;
}
