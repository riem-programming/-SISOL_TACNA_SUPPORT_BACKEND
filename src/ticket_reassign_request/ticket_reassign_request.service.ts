import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketReassignRequest } from './ticket_reassign_request.entity';
import { CreateTicketReassignRequest } from './dto/create-ticket-reassign-request.dto';
import { TicketService } from 'src/ticket/ticket.service';

@Injectable()
export class TicketReassignRequestService {
  constructor(
    @InjectRepository(TicketReassignRequest)
    private readonly repository: Repository<TicketReassignRequest>,
    private readonly ticketService: TicketService,
  ) {}

  getAll() {
    return this.repository.find();
  }

  getById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async create(body: CreateTicketReassignRequest) {
    const newTicket = await this.ticketService.createTicket(body);
    if (!newTicket) {
      throw new NotFoundException('Ocurrió un problema al crear el ticket');
    }

    const record = this.repository.create({
      ticket: newTicket,
      ticket_id: newTicket.id,
      ticket_numbers: body.ticket_numbers,
      new_responsible: body.new_responsible,
    });

    const saved = await this.repository.save(record);

    const fullTicket = await this.ticketService.getTicketByIdForAdmin(newTicket.id);
    if (fullTicket) this.ticketService.emitAdminNewTicket(fullTicket);

    return saved;
  }
}
