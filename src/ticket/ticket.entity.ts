import { CreateUserRequest } from 'src/create_user_request/create-user-request.entity';
import { Priority } from 'src/priority/priority.entity';
import { RequestType } from 'src/request_type/request_type.entity';
import { State } from 'src/state/state.entity';
import { TechnicalSupportRequest } from 'src/technical_support_request/technical_support_request.entity';
import { TicketReassignRequest } from 'src/ticket_reassign_request/ticket_reassign_request.entity';
import { User } from 'src/user/user.entity';
import { VoucherRequest } from 'src/voucher_request/voucher_request.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'ticket' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;

  @Column()
  state_id!: number;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state!: State;

  @Column()
  request_type_id!: number;

  @ManyToOne(() => RequestType)
  @JoinColumn({ name: 'request_type_id' })
  request_type!: RequestType;

  @Column()
  priority_id!: number;

  @ManyToOne(() => Priority)
  @JoinColumn({ name: 'priority_id' })
  priority!: Priority;

  // ESTO DEBE SER EL ID DEL USUARIO
  @Column()
  user_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateddAt!: Date;

  @OneToOne(() => CreateUserRequest, (cur) => cur.ticket)
  createUserRequest!: CreateUserRequest;

  @OneToOne(() => VoucherRequest, (vr) => vr.ticket)
  voucherRequest!: VoucherRequest;

  @OneToOne(() => TechnicalSupportRequest, (cur) => cur.ticket)
  technicalSupportRequest!: TechnicalSupportRequest;

  @OneToOne(() => TicketReassignRequest, (r) => r.ticket)
  ticketReassignRequest!: TicketReassignRequest;
}
