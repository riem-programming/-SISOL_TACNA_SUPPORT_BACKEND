import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'contract_type' })
export class ContractType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  long_name!: string;

  @Column()
  short_name!: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateddAt!: Date;
}
