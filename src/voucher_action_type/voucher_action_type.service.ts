import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoucherActionType } from './voucher_action_type.entity';
import { CreateVoucherActionType } from './dto/create-voucher-action-type.dto';
import { UpdateVoucherActionType } from './dto/update-voucher-action-type.dto';

@Injectable()
export class VoucherActionTypeService {
  constructor(
    @InjectRepository(VoucherActionType)
    private voucherActionTypeRepository: Repository<VoucherActionType>,
  ) {}

  getAllvoucherActionType() {
    return this.voucherActionTypeRepository.find();
  }

  getvoucherActionTypeById(id: number) {
    return this.voucherActionTypeRepository.findOneBy({ id });
  }

  async createvoucherActionType(body: CreateVoucherActionType) {
    const existingCode = await this.voucherActionTypeRepository.findOneBy({
      code: body.code,
    });
    if (existingCode) {
      throw new NotFoundException('El codigo ya existe');
    }

    const newvoucherActionType = this.voucherActionTypeRepository.create(body);
    return await this.voucherActionTypeRepository.save(newvoucherActionType);
  }

  async updatevoucherActionType(body: UpdateVoucherActionType) {
    const currentvoucherActionType = await this.getvoucherActionTypeById(
      body.id,
    );
    if (!currentvoucherActionType) return null;

    if (body.code && currentvoucherActionType.code !== body.code) {
      const existingCode = await this.voucherActionTypeRepository.findOneBy({
        code: body.code,
      });
      if (existingCode) {
        throw new NotFoundException('El codigo ya existe');
      }
    }

    Object.assign(currentvoucherActionType, body);
    return await this.voucherActionTypeRepository.save(
      currentvoucherActionType,
    );
  }

  async deletevoucherActionType(id: number) {
    const currentvoucherActionType = await this.getvoucherActionTypeById(id);
    if (!currentvoucherActionType) return null;

    await this.voucherActionTypeRepository.delete({
      id: currentvoucherActionType.id,
    });
    return currentvoucherActionType;
  }
}
