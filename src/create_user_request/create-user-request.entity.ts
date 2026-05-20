import { ContractType } from 'src/contract_type/contract_type.entity';
import { DocumentType } from 'src/document_type/document_type.entity';
import { SystemRole } from 'src/system_role/system_role.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'create_user_request' })
export class CreateUserRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_names!: string;

  @Column()
  last_names!: string;

  @Column()
  document_number!: string;

  @Column()
  position!: string;

  @Column()
  ticket_id!: number;

  @ManyToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket!: Ticket;

  @Column()
  document_type_id!: number;

  @ManyToOne(() => DocumentType)
  @JoinColumn({ name: 'document_type_id' })
  document_type!: DocumentType;

  @Column()
  contract_type_id!: number;

  @ManyToOne(() => ContractType)
  @JoinColumn({ name: 'contract_type_id' })
  contract_type!: ContractType;

  // @Column()
  // system_role_id!: number;

  @ManyToMany(() => SystemRole)
  @JoinTable({
    name: 'create_user_request_system_role',
    joinColumn: {
      name: 'create_user_request_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'system_role_id',
      referencedColumnName: 'id',
    },
  })
  system_roles!: SystemRole[];

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateddAt!: Date;
}
