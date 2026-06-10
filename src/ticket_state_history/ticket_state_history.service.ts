import { Injectable } from '@nestjs/common';
import { CreateTicketStateHistory } from './dto/createTicketStateHistory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketStateHistory } from './ticket_state_history.entity';
import { Repository } from 'typeorm';
import { Ticket } from 'src/ticket/ticket.entity';
import { PushNotificationService } from 'src/push_notification/push-notification.service';

@Injectable()
export class TicketStateHistoryService {
  constructor(
    @InjectRepository(TicketStateHistory)
    private ticketStateHistory: Repository<TicketStateHistory>,
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
    private readonly pushNotification: PushNotificationService,
  ) {}

  async getHistoryByTicketId(id: number) {
    return this.ticketStateHistory.find({
      where: { ticket_id: id },
      relations: ['state'],
    });
  }

  async createTicketStateHistory(body: CreateTicketStateHistory) {
    const saved = await this.ticketStateHistory.save(body);
    const ticket = await this.ticketRepo.findOneBy({ id: body.ticket_id });
    if (ticket && !body.skipPush) {
      await this.pushNotification.sendToUser(
        ticket.user_id,
        'Estado de tu ticket actualizado',
        `Tu solicitud #${body.ticket_id} cambió de estado`,
        `/panel/solicitud/${ticket.code}`,
      );
    }
    return saved;
  }
}
