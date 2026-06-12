import { Body, Controller, Delete, Get, HttpCode, Post, Request } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';
import { PushNotificationService } from './push-notification.service';

@Controller('push')
export class PushNotificationController {
  constructor(private readonly pushNotificationService: PushNotificationService) {}

  @Post('subscribe')
  @HttpCode(201)
  async subscribe(
    @Body() body: { endpoint: string; keys: { p256dh: string; auth: string } },
    @Request() req,
  ): Promise<void> {
    const userId = req.user.sub;
    await this.pushNotificationService.saveSubscription(
      userId,
      body.endpoint,
      body.keys.p256dh,
      body.keys.auth,
    );
  }

  @Delete('unsubscribe')
  @HttpCode(200)
  async unsubscribe(
    @Body() body: { endpoint: string },
    @Request() req,
  ): Promise<void> {
    const userId = req.user.sub;
    await this.pushNotificationService.removeSubscription(userId, body.endpoint);
  }
}
