import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';

@Controller('admin')
export class AdminController {
  @Public()
  @Post('verify')
  verifyKey(@Body() body: { key: string }): { valid: boolean } {
    const adminKey = process.env.ADMIN_KEY;
    if (!adminKey) return { valid: false };
    return { valid: body.key === adminKey };
  }
}
