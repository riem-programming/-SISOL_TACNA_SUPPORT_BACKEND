import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoucherRequest } from './voucher_request.entity';
import { CreateVoucherRequest } from './dto/create-voucher-request.dto';
import { TicketService } from 'src/ticket/ticket.service';
import { VoucherActionType } from 'src/voucher_action_type/voucher_action_type.entity';
import { UpdateVoucherRequest } from './dto/update-voucher-request.dto';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class VoucherRequestService {
  private readonly ticketService: TicketService;
  private readonly storageServcie: StorageService;

  constructor(
    @InjectRepository(VoucherRequest)
    private voucherRequestRepository: Repository<VoucherRequest>,
    @InjectRepository(VoucherActionType)
    private voucherActionTypeRepository: Repository<VoucherActionType>,
    TicketService: TicketService,
    StorageService: StorageService,
  ) {
    this.ticketService = TicketService;
    this.storageServcie = StorageService;
  }

  getAllvoucherRequest() {
    return this.voucherRequestRepository.find();
  }

  getvoucherRequestById(id: number) {
    return this.voucherRequestRepository.findOneBy({ id });
  }

  async createvoucherRequest(
    body: CreateVoucherRequest,
    file: Express.Multer.File,
  ) {
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

    let attachmentKey: string | null = null;
    if (file) {
      attachmentKey = await this.storageServcie.uploadFile(file);
    }

    const newVoucherRequest = this.voucherRequestRepository.create({
      voucher_action_type: voucherActionType,
      voucher_action_type_id: voucherActionType.id,
      ticket: newTicket,
      ticket_id: newTicket.id,
      voucher_code: body.voucher_code,
      speciality: body.speciality,
      motive: body.motive,
      attachment_key: attachmentKey ?? undefined,
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

  async getAttachmentUrl(id: number) {
    const voucher = await this.voucherRequestRepository.findOneBy({ id });
    if (!voucher?.attachment_key) {
      throw new NotFoundException('No tiene archivo adjunto');
    }

    const url = await this.storageServcie.getSignedUrl(voucher.attachment_key);
    return { url };
  }
}
