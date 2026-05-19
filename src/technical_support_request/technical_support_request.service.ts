import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketService } from 'src/ticket/ticket.service';
import { TechnicalSupportRequest } from './technical_support_request.entity';
import { CreateTechnicalSupportRequest } from './dto/create-technical-support-request.dto';
import { UpdateTechnicalSupportRequest } from './dto/update-technical-support-request.dto';
import { SupportMode } from 'src/support_mode/support_mode.entity';

@Injectable()
export class TechnicalSupportRequestService {
  private readonly ticketService: TicketService;

  constructor(
    @InjectRepository(TechnicalSupportRequest)
    private technicalSupportRequestRepository: Repository<TechnicalSupportRequest>,
    @InjectRepository(SupportMode)
    private supportModeRepository: Repository<SupportMode>,
    TicketService: TicketService,
  ) {
    this.ticketService = TicketService;
  }

  getAlltechnicalSupportRequest() {
    return this.technicalSupportRequestRepository.find();
  }

  gettechnicalSupportRequestById(id: number) {
    return this.technicalSupportRequestRepository.findOneBy({ id });
  }

  async createtechnicalSupportRequest(body: CreateTechnicalSupportRequest) {
    const supportMode = await this.supportModeRepository.findOneBy({
      id: body.support_mode_id,
    });
    if (!supportMode) {
      throw new NotFoundException('No existe el modo de soporte');
    }

    const newTicket = await this.ticketService.createTicket(body);
    if (!newTicket) {
      throw new NotFoundException('Ocurrio un problema al crear el ticket');
    }

    const newtechnicalSupportRequest =
      this.technicalSupportRequestRepository.create({
        ticket: newTicket,
        ticket_id: newTicket.id,
        supportMode: supportMode,
        support_mode_id: supportMode.id,
        anydesk_code: body.anydesk_code,
        contact_phone: body.contact_phone,
        office_number: body.office_number,
        preferred_support_date: body.preferred_support_date,
        problem_description: body.problem_description,
        speciality: body.speciality,
      });

    return await this.technicalSupportRequestRepository.save(
      newtechnicalSupportRequest,
    );
  }

  async updatetechnicalSupportRequest(body: UpdateTechnicalSupportRequest) {
    const currenttechnicalSupportRequest =
      await this.gettechnicalSupportRequestById(body.id);
    if (!currenttechnicalSupportRequest) return null;

    if (
      body.support_mode_id &&
      currenttechnicalSupportRequest.support_mode_id !== body.support_mode_id
    ) {
      const supportMode = await this.supportModeRepository.findOneBy({
        id: body.support_mode_id,
      });
      if (!supportMode) {
        throw new NotFoundException('No existe el modo de soporte');
      }
      currenttechnicalSupportRequest.supportMode = supportMode;
    }

    const { support_mode_id, ...ticketData } = body;
    Object.assign(currenttechnicalSupportRequest, ticketData);
    return await this.technicalSupportRequestRepository.save(
      currenttechnicalSupportRequest,
    );
  }

  async deletetechnicalSupportRequest(id: number) {
    const currenttechnicalSupportRequest =
      await this.gettechnicalSupportRequestById(id);
    if (!currenttechnicalSupportRequest) return null;

    await this.technicalSupportRequestRepository.delete({
      id: currenttechnicalSupportRequest.id,
    });
    return currenttechnicalSupportRequest;
  }
}
