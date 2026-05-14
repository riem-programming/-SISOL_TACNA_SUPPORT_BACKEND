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
import { RequestTypeService } from './request_type.service';
import { CreateRequestType } from './dto/create-request-type.dto';
import { UpdateRequestType } from './dto/update-request-type.dto';

@Controller('request-type')
export class RequestTypeController {
  private readonly requestTypeService: RequestTypeService;

  constructor(RequestTypeService: RequestTypeService) {
    this.requestTypeService = RequestTypeService;
  }

  private notFoundMessage = 'No existe el tipo de solicitud';

  @Get('/')
  async getAllRequestType() {
    return await this.requestTypeService.getAllRequestType();
  }

  @Get('/:id')
  async getRequestTypeById(@Param('id') id: string) {
    const currentRequestType = await this.requestTypeService.getRequestTypeById(
      Number(id),
    );
    if (!currentRequestType) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return currentRequestType;
  }

  @Post('/')
  async createRequestType(@Body() body: CreateRequestType) {
    return await this.requestTypeService.createRequestType(body);
  }

  @Put('/')
  async updateRequestType(@Body() body: UpdateRequestType) {
    const updateRequestType =
      await this.requestTypeService.updateRequestType(body);
    if (!updateRequestType) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return updateRequestType;
  }

  @Delete('/:id')
  async deleteRequestType(@Param('id') id: number) {
    const deleteRequestType =
      await this.requestTypeService.deleteRequestType(id);
    if (!deleteRequestType) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return deleteRequestType;
  }
}
