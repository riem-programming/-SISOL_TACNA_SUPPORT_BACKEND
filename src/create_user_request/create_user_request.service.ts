import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketService } from 'src/ticket/ticket.service';
import { CreateUserRequest } from './create-user-request.entity';
import { CreateCreateUserRequest } from './dto/create-create-user-request.dto';
import { DocumentType } from 'src/document_type/document_type.entity';
import { ContractType } from 'src/contract_type/contract_type.entity';
import { SystemRole } from 'src/system_role/system_role.entity';
import { UpdateCreateUserRequest } from './dto/update-create-user-request.dto';

@Injectable()
export class CreateUserRequestService {
  private readonly ticketService: TicketService;

  constructor(
    @InjectRepository(CreateUserRequest)
    private createUserRequestRepository: Repository<CreateUserRequest>,
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
    @InjectRepository(ContractType)
    private contractTypeRepository: Repository<ContractType>,
    @InjectRepository(SystemRole)
    private systemRoleRepository: Repository<SystemRole>,
    TicketService: TicketService,
  ) {
    this.ticketService = TicketService;
  }

  getAllcreateUserRequest() {
    return this.createUserRequestRepository.find();
  }

  getcreateUserRequestById(id: number) {
    return this.createUserRequestRepository.findOneBy({ id });
  }

  async createcreateUserRequest(body: CreateCreateUserRequest) {
    const documentType = await this.documentTypeRepository.findOneBy({
      id: body.document_type_id,
    });
    if (!documentType) {
      throw new NotFoundException('No existe el tipo documento');
    }

    const contractType = await this.contractTypeRepository.findOneBy({
      id: body.contract_type_id,
    });
    if (!contractType) {
      throw new NotFoundException('No existe el tipo de contrato');
    }

    const systemRole = await this.systemRoleRepository.findOneBy({
      id: body.system_role_id,
    });
    if (!systemRole) {
      throw new NotFoundException('No existe el tipo de rol');
    }

    const newTicket = await this.ticketService.createTicket(body);
    if (!newTicket) {
      throw new NotFoundException('Ocurrio un problema al crear el ticket');
    }

    const newcreateUserRequest = this.createUserRequestRepository.create({
      document_type: documentType,
      document_type_id: documentType.id,
      contract_type: contractType,
      contract_type_id: contractType.id,
      system_role: systemRole,
      system_role_id: systemRole.id,
      ticket: newTicket,
      ticket_id: newTicket.id,
      first_names: body.first_names,
      last_names: body.last_names,
      document_number: body.document_number,
      position: body.position,
    });

    return await this.createUserRequestRepository.save(newcreateUserRequest);
  }

  async updatecreateUserRequest(body: UpdateCreateUserRequest) {
    const currentcreateUserRequest = await this.getcreateUserRequestById(
      body.id,
    );
    if (!currentcreateUserRequest) return null;

    if (
      body.document_type_id &&
      body.document_type_id !== currentcreateUserRequest.document_type_id
    ) {
      const documentType = await this.documentTypeRepository.findOneBy({
        id: body.document_type_id,
      });
      if (!documentType) {
        throw new NotFoundException('No existe el tipo documento');
      }

      currentcreateUserRequest.document_type = documentType;
    }

    if (
      body.contract_type_id &&
      body.contract_type_id !== currentcreateUserRequest.contract_type_id
    ) {
      const contractType = await this.contractTypeRepository.findOneBy({
        id: body.contract_type_id,
      });
      if (!contractType) {
        throw new NotFoundException('No existe el tipo de contrato');
      }

      currentcreateUserRequest.contract_type = contractType;
    }

    if (
      body.system_role_id &&
      body.system_role_id !== currentcreateUserRequest.system_role_id
    ) {
      const systemRole = await this.systemRoleRepository.findOneBy({
        id: body.system_role_id,
      });
      if (!systemRole) {
        throw new NotFoundException('No existe el tipo de rol');
      }
      currentcreateUserRequest.system_role = systemRole;
    }

    const {
      system_role_id,
      contract_type_id,
      document_type_id,
      ...ticketData
    } = body;

    Object.assign(currentcreateUserRequest, ticketData);
    return await this.createUserRequestRepository.save(
      currentcreateUserRequest,
    );
  }

  async deletecreateUserRequest(id: number) {
    const currentcreateUserRequest = await this.getcreateUserRequestById(id);
    if (!currentcreateUserRequest) return null;

    await this.createUserRequestRepository.delete({
      id: currentcreateUserRequest.id,
    });
    return currentcreateUserRequest;
  }
}
