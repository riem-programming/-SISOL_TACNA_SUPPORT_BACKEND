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
import { PriorityService } from './priority.service';
import { CreatePriority } from './dto/create-priority.dto';
import { UpdatePriority } from './dto/update-priority.dto';

@Controller('priority')
export class PriorityController {
  private readonly priorityService: PriorityService;

  constructor(PriorityService: PriorityService) {
    this.priorityService = PriorityService;
  }

  private notFoundMessage = 'No existe la prioidad';

  @Get('/')
  async getAllPriority() {
    return await this.priorityService.getAllPriority();
  }

  @Get('/:id')
  async getPriorityById(@Param('id') id: string) {
    const currentPriority = await this.priorityService.getPriorityById(
      Number(id),
    );
    if (!currentPriority) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return currentPriority;
  }

  @Post('/')
  async createPriority(@Body() body: CreatePriority) {
    return await this.priorityService.createPriority(body);
  }

  @Put('/')
  async updatePriority(@Body() body: UpdatePriority) {
    const updatePriority = await this.priorityService.updatePriority(body);
    if (!updatePriority) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return updatePriority;
  }

  @Delete('/:id')
  async deletePriority(@Param('id') id: number) {
    const deletePriority = await this.priorityService.deletePriority(id);
    if (!deletePriority) {
      throw new NotFoundException(this.notFoundMessage);
    }
    return deletePriority;
  }
}
