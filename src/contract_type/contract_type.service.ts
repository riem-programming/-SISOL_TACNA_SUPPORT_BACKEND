import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractType } from './contract_type.entity';
import { CreateContractType } from './dto/create-contract-type.dto';
import { UpdateContractType } from './dto/update-contract-type.dto';

@Injectable()
export class ContractTypeService {
  constructor(
    @InjectRepository(ContractType)
    private contractTypeRepository: Repository<ContractType>,
  ) {}

  getAllcontractType() {
    return this.contractTypeRepository.find();
  }

  getcontractTypeById(id: number) {
    return this.contractTypeRepository.findOneBy({ id });
  }

  createcontractType(body: CreateContractType) {
    const newcontractType = this.contractTypeRepository.create(body);
    return this.contractTypeRepository.save(newcontractType);
  }

  async updatecontractType(body: UpdateContractType) {
    const currentcontractType = await this.getcontractTypeById(body.id);
    if (!currentcontractType) return null;

    Object.assign(currentcontractType, body);
    return await this.contractTypeRepository.save(currentcontractType);
  }

  async deletecontractType(id: number) {
    const currentcontractType = await this.getcontractTypeById(id);
    if (!currentcontractType) return null;

    await this.contractTypeRepository.delete({ id: currentcontractType.id });
    return currentcontractType;
  }
}
