import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContractTypeService } from './contract_type.service';
import { CreateContractType } from './dto/create-contract-type.dto';
import { UpdateContractType } from './dto/update-contract-type.dto';

@Controller('contract-type')
export class ContractTypeController {
  private readonly contractTypeService: ContractTypeService;

  constructor(contractTypeService: ContractTypeService) {
    this.contractTypeService = contractTypeService;
  }

  @Get('/')
  async getAllcontractType() {
    return await this.contractTypeService.getAllcontractType();
  }

  @Get('/:id')
  async getcontractTypeById(@Param('id') id: string) {
    const currentcontractType =
      await this.contractTypeService.getcontractTypeById(Number(id));
    if (!currentcontractType) {
      throw new NotFoundException('No existe el estado');
    }
    return currentcontractType;
  }

  @Post('/')
  async createcontractType(@Body() body: CreateContractType) {
    return await this.contractTypeService.createcontractType(body);
  }

  @Put('/')
  async updatecontractType(@Body() body: UpdateContractType) {
    const updatecontractType =
      await this.contractTypeService.updatecontractType(body);
    if (!updatecontractType) {
      throw new NotFoundException('No existe el estado');
    }
    return updatecontractType;
  }

  @Delete('/:id')
  async deletecontractType(@Param('id') id: number) {
    const deletecontractType =
      await this.contractTypeService.deletecontractType(id);
    if (!deletecontractType) {
      throw new NotFoundException('No existe el estado');
    }
    return deletecontractType;
  }
}
