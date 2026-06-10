import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as webpush from 'web-push';
import { PushSubscription } from './push-subscription.entity';

@Injectable()
export class PushNotificationService {
  constructor(
    @InjectRepository(PushSubscription)
    private readonly subscriptionRepository: Repository<PushSubscription>,
    private readonly configService: ConfigService,
  ) {
    const subject = this.configService.get<string>('VAPID_SUBJECT', '');
    const publicKey = this.configService.get<string>('VAPID_PUBLIC_KEY', '');
    const privateKey = this.configService.get<string>('VAPID_PRIVATE_KEY', '');
    if (subject && publicKey && privateKey) {
      webpush.setVapidDetails(subject, publicKey, privateKey);
    }
  }

  async saveSubscription(
    userId: number,
    endpoint: string,
    p256dh: string,
    auth: string,
  ): Promise<void> {
    const existing = await this.subscriptionRepository.findOneBy({ endpoint });
    if (existing) {
      await this.subscriptionRepository.update(existing.id, {
        user_id: userId,
        p256dh_key: p256dh,
        auth_key: auth,
      });
    } else {
      const subscription = this.subscriptionRepository.create({
        user_id: userId,
        endpoint,
        p256dh_key: p256dh,
        auth_key: auth,
      });
      await this.subscriptionRepository.save(subscription);
    }
  }

  async debugSubscriptions(): Promise<any> {
    const subs = await this.subscriptionRepository.find();
    return { count: subs.length, subscriptions: subs.map(s => ({ id: s.id, user_id: s.user_id, endpoint: s.endpoint.substring(0, 60) + '...' })) };
  }

  async removeSubscription(userId: number, endpoint: string): Promise<void> {
    await this.subscriptionRepository.delete({ user_id: userId, endpoint });
  }

  async sendToUser(
    userId: number,
    title: string,
    body: string,
    url: string,
  ): Promise<void> {
    const subscriptions = await this.subscriptionRepository.findBy({ user_id: userId });

    await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: {
                p256dh: sub.p256dh_key,
                auth: sub.auth_key,
              },
            },
            JSON.stringify({
              notification: {
                title,
                body,
                icon: '/icons/icon-192x192.png',
                data: {
                  onActionClick: {
                    default: { operation: 'navigateLastFocusedOrOpen', url },
                  },
                },
              },
            }),
          );
        } catch (err: any) {
          console.error('[Push] sendNotification error:', err.statusCode, err.message);
          if (err.statusCode === 410 || err.statusCode === 404) {
            await this.subscriptionRepository.delete({ id: sub.id });
          }
        }
      }),
    );
  }
}
