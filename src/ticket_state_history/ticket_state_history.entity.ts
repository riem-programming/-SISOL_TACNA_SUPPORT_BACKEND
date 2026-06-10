import { State } from 'src/state/state.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ticket_state_history' })
export class TicketStateHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ticket_id!: number;

  @ManyToOne(() => Ticket, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticket_id' })
  ticket!: Ticket;

  @Column()
  state_id!: number;

  @ManyToOne(() => State, { nullable: false })
  @JoinColumn({ name: 'state_id' })
  state!: State;

  @CreateDateColumn()
  createdAt!: Date;
}
