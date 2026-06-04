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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VoucherRequestService } from './voucher_request.service';
import { CreateVoucherRequest } from './dto/create-voucher-request.dto';
import { UpdateVoucherRequest } from './dto/update-voucher-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

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

  @Get('/:id/attachment')
  async getAttachment(@Param('id') id: number) {
    return await this.voucherRequestService.getAttachmentUrl(id);
  }

  @Post('/')
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_, file, cb) => {
        const allowed = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'application/pdf',
        ];
        cb(null, allowed.includes(file.mimetype));
      },
    }),
  )
  async createvoucherRequest(
    @Body() body: CreateVoucherRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.voucherRequestService.createvoucherRequest(body, file);
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
