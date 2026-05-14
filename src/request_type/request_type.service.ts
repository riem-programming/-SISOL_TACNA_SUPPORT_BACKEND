import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestType } from './request_type.entity';
import { CreateRequestType } from './dto/create-request-type.dto';
import { UpdateRequestType } from './dto/update-request-type.dto';

@Injectable()
export class RequestTypeService {
  constructor(
    @InjectRepository(RequestType)
    private requestTypeRepository: Repository<RequestType>,
  ) {}

  getAllRequestType() {
    return this.requestTypeRepository.find();
  }

  getRequestTypeById(id: number) {
    return this.requestTypeRepository.findOneBy({ id });
  }

  createRequestType(body: CreateRequestType) {
    const newRequestType = this.requestTypeRepository.create(body);
    return this.requestTypeRepository.save(newRequestType);
  }

  async updateRequestType(body: UpdateRequestType) {
    const currentRequestType = await this.getRequestTypeById(body.id);
    if (!currentRequestType) return null;

    Object.assign(currentRequestType, body);
    return await this.requestTypeRepository.save(currentRequestType);
  }

  async deleteRequestType(id: number) {
    const currentRequestType = await this.getRequestTypeById(id);
    if (!currentRequestType) return null;

    await this.requestTypeRepository.delete({ id: currentRequestType.id });
    return currentRequestType;
  }
}
