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
import { VoucherActionTypeService } from './voucher_action_type.service';
import { CreateVoucherActionType } from './dto/create-voucher-action-type.dto';
import { UpdateVoucherActionType } from './dto/update-voucher-action-type.dto';

@Controller('voucher-action-type')
export class VoucherActionTypeController {
  private readonly voucherActionTypeService: VoucherActionTypeService;

  constructor(voucherActionTypeService: VoucherActionTypeService) {
    this.voucherActionTypeService = voucherActionTypeService;
  }

  private notFoundMessage = 'No existe el tipo de acción para el boucher';

  @Get('/')
  async getAllvoucherActionType() {
    return await this.voucherActionTypeService.getAllvoucherActionType();
  }

  @Get('/:id')
  async getvoucherActionTypeById(@Param('id') id: string) {
    const currentvoucherActionType =
      await this.voucherActionTypeService.getvoucherActionTypeById(Number(id));
    if (!currentvoucherActionType) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return currentvoucherActionType;
  }

  @Post('/')
  async createvoucherActionType(@Body() body: CreateVoucherActionType) {
    return await this.voucherActionTypeService.createvoucherActionType(body);
  }

  @Put('/')
  async updatevoucherActionType(@Body() body: UpdateVoucherActionType) {
    const updatevoucherActionType =
      await this.voucherActionTypeService.updatevoucherActionType(body);
    if (!updatevoucherActionType) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return updatevoucherActionType;
  }

  @Delete('/:id')
  async deletevoucherActionType(@Param('id') id: number) {
    const deletevoucherActionType =
      await this.voucherActionTypeService.deletevoucherActionType(id);
    if (!deletevoucherActionType) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return deletevoucherActionType;
  }
}
