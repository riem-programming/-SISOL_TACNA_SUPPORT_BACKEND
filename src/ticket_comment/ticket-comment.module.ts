import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketComment } from './ticket-comment.entity';
import { TicketCommentController } from './ticket-comment.controller';
import { TicketCommentService } from './ticket-comment.service';
import { TicketModule } from 'src/ticket/ticket.module';
import { TelegramModule } from 'src/telegram/telegram.module';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketComment, User]), TicketModule, TelegramModule],
  controllers: [TicketCommentController],
  providers: [TicketCommentService],
  exports: [TicketCommentService],
})
export class TicketCommentModule {}
