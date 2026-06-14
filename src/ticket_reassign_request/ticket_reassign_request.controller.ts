import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { TicketReassignRequestService } from './ticket_reassign_request.service';
import { CreateTicketReassignRequest } from './dto/create-ticket-reassign-request.dto';

@Controller('ticket-reassign-request')
export class TicketReassignRequestController {
  constructor(private readonly service: TicketReassignRequestService) {}

  @Get('/')
  getAll() {
    return this.service.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const record = await this.service.getById(Number(id));
    if (!record) throw new NotFoundException('No existe la solicitud de reasignación');
    return record;
  }

  @Post('/')
  async create(@Body() body: CreateTicketReassignRequest) {
    return this.service.create(body);
  }
}
