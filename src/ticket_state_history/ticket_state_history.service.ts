import { Injectable } from '@nestjs/common';
import { CreateTicketStateHistory } from './dto/createTicketStateHistory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketStateHistory } from './ticket_state_history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketStateHistoryService {
  constructor(
    @InjectRepository(TicketStateHistory)
    private ticketStateHistory: Repository<TicketStateHistory>,
  ) {}

  async getHistoryByTicketId(id: number) {
    return this.ticketStateHistory.find({
      where: { ticket_id: id },
      relations: ['state'],
    });
  }

  async createTicketStateHistory(body: CreateTicketStateHistory) {
    return await this.ticketStateHistory.save(body);
  }
}
