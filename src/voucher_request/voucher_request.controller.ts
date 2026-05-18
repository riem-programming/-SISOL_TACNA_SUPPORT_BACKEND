import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { VoucherRequestService } from './voucher_request.service';
import { CreateVoucherRequest } from './dto/create-voucher-request.dto';
import { UpdateVoucherRequest } from './dto/update-voucher-request.dto';

@Controller('voucher-request')
export class VoucherRequestController {
  private readonly voucherRequestService: VoucherRequestService;

  constructor(voucherRequestService: VoucherRequestService) {
    this.voucherRequestService = voucherRequestService;
  }

  private notFoundMessage = 'No existe la solicitud del boucher';

  @Get('/')
  async getAllvoucherRequest() {
    return await this.voucherRequestService.getAllvoucherRequest();
  }

  @Get('/:id')
  async getvoucherRequestById(@Param('id') id: string) {
    const currentvoucherRequest =
      await this.voucherRequestService.getvoucherRequestById(Number(id));
    if (!currentvoucherRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return currentvoucherRequest;
  }

  @Post('/')
  async createvoucherRequest(@Body() body: CreateVoucherRequest) {
    return await this.voucherRequestService.createvoucherRequest(body);
  }

  @Put('/')
  async updatevoucherRequest(@Body() body: UpdateVoucherRequest) {
    const updatevoucherRequest =
      await this.voucherRequestService.updatevoucherRequest(body);
    if (!updatevoucherRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return updatevoucherRequest;
  }

  @Delete('/:id')
  async deletevoucherRequest(@Param('id') id: number) {
    const deletevoucherRequest =
      await this.voucherRequestService.deletevoucherRequest(id);
    if (!deletevoucherRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return deletevoucherRequest;
  }
}
