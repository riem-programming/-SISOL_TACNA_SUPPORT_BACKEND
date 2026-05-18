import { Ticket } from 'src/ticket/ticket.entity';
import { VoucherActionType } from 'src/voucher_action_type/voucher_action_type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'voucher_request' })
export class VoucherRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ticket_id!: number;

  @ManyToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket!: Ticket;

  @Column()
  voucher_action_type_id!: number;

  @ManyToOne(() => VoucherActionType)
  @JoinColumn({ name: 'voucher_action_type_id' })
  voucher_action_type!: VoucherActionType;

  @Column()
  voucher_code!: string;

  @Column({ nullable: true })
  speciality!: string;

  @Column({ nullable: true })
  motive!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
