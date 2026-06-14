import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketComment } from './ticket-comment.entity';
import { CreateTicketCommentDto } from './dto/create-ticket-comment.dto';
import { CreateAdminTicketCommentDto } from './dto/create-admin-ticket-comment.dto';
import { TicketService } from 'src/ticket/ticket.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { User } from 'src/user/user.entity';
import { PushNotificationService } from 'src/push_notification/push-notification.service';

@Injectable()
export class TicketCommentService {
  constructor(
    @InjectRepository(TicketComment)
    private readonly commentRepository: Repository<TicketComment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly ticketService: TicketService,
    private readonly telegram: TelegramService,
    private readonly pushNotification: PushNotificationService,
  ) {}

  getCommentsByTicketId(ticketId: number): Promise<TicketComment[]> {
    return this.commentRepository.find({
      where: { ticket_id: ticketId },
      relations: ['user'],
      order: { created_at: 'ASC' },
      select: {
        id: true,
        ticket_id: true,
        user_id: true,
        author_type: true,
        message: true,
        read_at: true,
        created_at: true,
        user: {
          id: true,
          username: true,
        },
      },
    });
  }

  async createUserComment(dto: CreateTicketCommentDto): Promise<TicketComment> {
    const comment = this.commentRepository.create({
      ticket_id: dto.ticket_id,
      user_id: dto.user_id ?? null,
      author_type: 'user',
      message: dto.message,
    });
    const saved = await this.commentRepository.save(comment);
    this.ticketService.emitNewComment(saved);

    const user = dto.user_id
      ? await this.userRepository.findOneBy({ id: dto.user_id })
      : null;
    this.telegram.notificarNuevoMensajeChat(
      dto.ticket_id,
      user?.username ?? 'Usuario',
      dto.message,
    );

    return saved;
  }

  async markAdminRead(ticketId: number): Promise<void> {
    await this.commentRepository
      .createQueryBuilder()
      .update()
      .set({ read_at: new Date() })
      .where('ticket_id = :ticketId AND author_type = :type AND read_at IS NULL', {
        ticketId,
        type: 'user',
      })
      .execute();

    const ticket = await this.ticketService.getTicketById(ticketId);
    if (ticket) {
      this.ticketService.emitMessagesRead(ticket.user_id, ticketId);
    }
  }

  async markUserRead(ticketId: number): Promise<void> {
    await this.commentRepository
      .createQueryBuilder()
      .update()
      .set({ read_at: new Date() })
      .where('ticket_id = :ticketId AND author_type = :type AND read_at IS NULL', {
        ticketId,
        type: 'admin',
      })
      .execute();
    this.ticketService.emitMessagesReadToAdmin(ticketId);
  }

  async createAdminComment(dto: CreateAdminTicketCommentDto): Promise<TicketComment> {
    const comment = this.commentRepository.create({
      ticket_id: dto.ticket_id,
      user_id: null,
      author_type: 'admin',
      message: dto.message,
    });
    const saved = await this.commentRepository.save(comment);
    await this.ticketService.emitNewCommentToUser(dto.ticket_id, saved);
    const ticket = await this.ticketService.getTicketById(dto.ticket_id);
    if (ticket) {
      await this.pushNotification.sendToUser(
        ticket.user_id,
        'Nueva respuesta de soporte',
        dto.message,
        `/panel/solicitud/${ticket.code}/chat`,
      );
    }
    return saved;
  }
}
