import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'push_subscription' })
export class PushSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ unique: true })
  endpoint: string;

  @Column()
  p256dh_key: string;

  @Column()
  auth_key: string;

  @CreateDateColumn()
  created_at: Date;
}
