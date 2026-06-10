import { Ticket } from 'src/ticket/ticket.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ticket_comment' })
export class TicketComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ticket_id!: number;

  @ManyToOne(() => Ticket, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticket_id' })
  ticket!: Ticket;

  @Column({ nullable: true, type: 'int' })
  user_id!: number | null;

  @ManyToOne(() => User, { nullable: true, eager: false })
  @JoinColumn({ name: 'user_id' })
  user!: User | null;

  @Column({ type: 'varchar' })
  author_type!: 'user' | 'admin';

  @Column({ type: 'text' })
  message!: string;

  @CreateDateColumn()
  created_at!: Date;
}
