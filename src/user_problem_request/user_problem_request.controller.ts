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
import { UserProblemRequestService } from './user_problem_request.service';
import { CreateUserProblemRequest } from './dto/create-user-problem-request.dto';
import { UpdateUserProblemRequest } from './dto/update-user-problem-request.dto';

@Controller('user-problem-request')
export class UserProblemRequestController {
  private readonly userProblemRequestService: UserProblemRequestService;

  constructor(userProblemRequestService: UserProblemRequestService) {
    this.userProblemRequestService = userProblemRequestService;
  }

  private notFoundMessage = 'No existe el ticket de problema de usuario';

  @Get('/')
  async getAlluserProblemRequest() {
    return await this.userProblemRequestService.getAlluserProblemRequest();
  }

  @Get('/:id')
  async getuserProblemRequestById(@Param('id') id: string) {
    const currentuserProblemRequest =
      await this.userProblemRequestService.getuserProblemRequestById(
        Number(id),
      );
    if (!currentuserProblemRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return currentuserProblemRequest;
  }

  @Post('/')
  async createuserProblemRequest(@Body() body: CreateUserProblemRequest) {
    return await this.userProblemRequestService.createuserProblemRequest(body);
  }

  @Put('/')
  async updateuserProblemRequest(@Body() body: UpdateUserProblemRequest) {
    const updateuserProblemRequest =
      await this.userProblemRequestService.updateuserProblemRequest(body);
    if (!updateuserProblemRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return updateuserProblemRequest;
  }

  @Delete('/:id')
  async deleteuserProblemRequest(@Param('id') id: number) {
    const deleteuserProblemRequest =
      await this.userProblemRequestService.deleteuserProblemRequest(id);
    if (!deleteuserProblemRequest) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return deleteuserProblemRequest;
  }
}
