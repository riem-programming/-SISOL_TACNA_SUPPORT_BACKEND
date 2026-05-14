import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'request_type' })
export class RequestType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  short_name!: string;

  @Column()
  long_name!: string;

  @Column({ unique: true })
  code!: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateddAt!: Date;
}
