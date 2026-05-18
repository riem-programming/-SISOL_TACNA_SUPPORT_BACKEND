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
import { CreateUserRequestService } from './create_user_request.service';
import { CreateCreateUserRequest } from './dto/create-create-user-request.dto';
import { UpdateCreateUserRequest } from './dto/update-create-user-request.dto';

@Controller('create-user-request')
export class CreateUserRequestController {
  private readonly createUserRequestService: CreateUserRequestService;

  constructor(createUserRequestService: CreateUserRequestService) {
    this.createUserRequestService = createUserRequestService;
  }

  private notFoundMessage = 'No existe el ticket de creación de usuario';

  @Get('/')
  async getAllcreateUserRequest() {
    return await this.createUserRequestService.getAllcreateUserRequest();
  }

  @Get('/:id')
  async getcreateUserRequestById(@Param('id') id: string) {
    const currentcreateUserRequest =
      await this.createUserRequestService.getcreateUserRequestById(Number(id));
    if (!currentcreateUserRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return currentcreateUserRequest;
  }

  @Post('/')
  async createcreateUserRequest(@Body() body: CreateCreateUserRequest) {
    return await this.createUserRequestService.createcreateUserRequest(body);
  }

  @Put('/')
  async updatecreateUserRequest(@Body() body: UpdateCreateUserRequest) {
    const updatecreateUserRequest =
      await this.createUserRequestService.updatecreateUserRequest(body);
    if (!updatecreateUserRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return updatecreateUserRequest;
  }

  @Delete('/:id')
  async deletecreateUserRequest(@Param('id') id: number) {
    const deletecreateUserRequest =
      await this.createUserRequestService.deletecreateUserRequest(id);
    if (!deletecreateUserRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return deletecreateUserRequest;
  }
}
