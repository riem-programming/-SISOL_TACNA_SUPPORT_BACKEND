import { Priority } from 'src/priority/priority.entity';
import { RequestType } from 'src/request_type/request_type.entity';
import { State } from 'src/state/state.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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
  created_by!: number;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateddAt!: Date;
}
