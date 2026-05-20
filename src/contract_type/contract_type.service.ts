import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createcontractType(body: CreateContractType) {
    const existingCode = await this.contractTypeRepository.findOneBy({
      code: body.code,
    });
    if (existingCode) {
      throw new NotFoundException('Ya existe el código');
    }

    const newcontractType = this.contractTypeRepository.create(body);
    return this.contractTypeRepository.save(newcontractType);
  }

  async updatecontractType(body: UpdateContractType) {
    const currentcontractType = await this.getcontractTypeById(body.id);
    if (!currentcontractType) return null;

    if (body.code && body.code !== currentcontractType.code) {
      const existingCode = await this.contractTypeRepository.findOneBy({
        code: body.code,
      });
      if (existingCode) {
        throw new NotFoundException('Ya existe el código');
      }
    }

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
