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
import { TechnicalSupportRequestService } from './technical_support_request.service';
import { CreateTechnicalSupportRequest } from './dto/create-technical-support-request.dto';
import { UpdateTechnicalSupportRequest } from './dto/update-technical-support-request.dto';

@Controller('technical-support-request')
export class TechnicalSupportRequestController {
  private readonly technicalSupportRequestService: TechnicalSupportRequestService;

  constructor(technicalSupportRequestService: TechnicalSupportRequestService) {
    this.technicalSupportRequestService = technicalSupportRequestService;
  }

  private notFoundMessage = 'No existe el ticket de soporte técnico';

  @Get('/')
  async getAlltechnicalSupportRequest() {
    return await this.technicalSupportRequestService.getAlltechnicalSupportRequest();
  }

  @Get('/:id')
  async gettechnicalSupportRequestById(@Param('id') id: string) {
    const currenttechnicalSupportRequest =
      await this.technicalSupportRequestService.gettechnicalSupportRequestById(
        Number(id),
      );
    if (!currenttechnicalSupportRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return currenttechnicalSupportRequest;
  }

  @Post('/')
  async createtechnicalSupportRequest(
    @Body() body: CreateTechnicalSupportRequest,
  ) {
    return await this.technicalSupportRequestService.createtechnicalSupportRequest(
      body,
    );
  }

  @Put('/')
  async updatetechnicalSupportRequest(
    @Body() body: UpdateTechnicalSupportRequest,
  ) {
    const updatetechnicalSupportRequest =
      await this.technicalSupportRequestService.updatetechnicalSupportRequest(
        body,
      );
    if (!updatetechnicalSupportRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return updatetechnicalSupportRequest;
  }

  @Delete('/:id')
  async deletetechnicalSupportRequest(@Param('id') id: number) {
    const deletetechnicalSupportRequest =
      await this.technicalSupportRequestService.deletetechnicalSupportRequest(
        id,
      );
    if (!deletetechnicalSupportRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return deletetechnicalSupportRequest;
  }
}
