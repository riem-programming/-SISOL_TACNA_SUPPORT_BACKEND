import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoucherRequest } from './voucher_request.entity';
import { CreateVoucherRequest } from './dto/create-voucher-request.dto';
import { TicketService } from 'src/ticket/ticket.service';
import { VoucherActionType } from 'src/voucher_action_type/voucher_action_type.entity';
import { UpdateVoucherRequest } from './dto/update-voucher-request.dto';

@Injectable()
export class VoucherRequestService {
  private readonly ticketService: TicketService;

  constructor(
    @InjectRepository(VoucherRequest)
    private voucherRequestRepository: Repository<VoucherRequest>,
    @InjectRepository(VoucherActionType)
    private voucherActionTypeRepository: Repository<VoucherActionType>,
    TicketService: TicketService,
  ) {
    this.ticketService = TicketService;
  }

  getAllvoucherRequest() {
    return this.voucherRequestRepository.find();
  }

  getvoucherRequestById(id: number) {
    return this.voucherRequestRepository.findOneBy({ id });
  }

  async createvoucherRequest(body: CreateVoucherRequest) {
    const voucherActionType = await this.voucherActionTypeRepository.findOneBy({
      id: body.voucher_action_type_id,
    });
    if (!voucherActionType) {
      throw new NotFoundException('No existe el tipo de acción del boucher');
    }

    const newTicket = await this.ticketService.createTicket(body);
    if (!newTicket) {
      throw new NotFoundException('Ocurrio un problema al crear el ticket');
    }

    const newVoucherRequest = this.voucherRequestRepository.create({
      voucher_action_type: voucherActionType,
      voucher_action_type_id: voucherActionType.id,
      ticket: newTicket,
      ticket_id: newTicket.id,
      voucher_code: body.voucher_code,
      speciality: body.speciality,
      motive: body.motive,
    });

    return await this.voucherRequestRepository.save(newVoucherRequest);
  }

  async updatevoucherRequest(body: UpdateVoucherRequest) {
    const currentvoucherRequest = await this.getvoucherRequestById(body.id);
    if (!currentvoucherRequest) return null;

    Object.assign(currentvoucherRequest, body);
    return await this.voucherRequestRepository.save(currentvoucherRequest);
  }

  async deletevoucherRequest(id: number) {
    const currentvoucherRequest = await this.getvoucherRequestById(id);
    if (!currentvoucherRequest) return null;

    await this.voucherRequestRepository.delete({
      id: currentvoucherRequest.id,
    });
    return currentvoucherRequest;
  }
}
