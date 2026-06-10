import { SupportMode } from 'src/support_mode/support_mode.entity';
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

@Entity({ name: 'technical_support_request' })
export class TechnicalSupportRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ticket_id!: number;

  @ManyToOne(() => Ticket, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticket_id' })
  ticket!: Ticket;

  @Column()
  support_mode_id!: number;

  @ManyToOne(() => SupportMode)
  @JoinColumn({ name: 'support_mode_id' })
  supportMode!: SupportMode;

  @Column({ nullable: true })
  speciality!: string;

  @Column({ nullable: true })
  office_number!: string;

  @Column()
  problem_description!: string;

  @Column({ nullable: true })
  contact_phone!: string;

  @Column({ nullable: true })
  anydesk_code!: string;

  @Column()
  preferred_support_date!: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateddAt!: Date;
}
