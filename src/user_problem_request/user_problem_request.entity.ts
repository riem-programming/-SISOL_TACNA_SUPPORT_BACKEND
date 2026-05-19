import { ContractType } from 'src/contract_type/contract_type.entity';
import { DocumentType } from 'src/document_type/document_type.entity';
import { SystemRole } from 'src/system_role/system_role.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user-problem-request' })
export class UserProblemRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  problem_description!: string;

  @Column()
  system_name!: string;

  @Column()
  affected_module!: string;

  @Column()
  ticket_id!: number;

  @ManyToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket!: Ticket;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateddAt!: Date;
}
