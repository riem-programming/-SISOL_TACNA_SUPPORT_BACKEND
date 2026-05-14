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
import { StateService } from './state.service';
import { UpdateState } from './dto/update-state.dto';
import { CreateState } from './dto/create-state.dto';

@Controller('state')
export class StateController {
  private readonly stateService: StateService;

  constructor(stateService: StateService) {
    this.stateService = stateService;
  }

  @Get('/')
  async getAllState() {
    return await this.stateService.getAllState();
  }

  @Get('/:id')
  async getStateById(@Param('id') id: string) {
    const currentstate = await this.stateService.getStateById(Number(id));
    if (!currentstate) {
      throw new NotFoundException('No existe el estado');
    }
    return currentstate;
  }

  @Post('/')
  async createState(@Body() body: CreateState) {
    return await this.stateService.createState(body);
  }

  @Put('/')
  async updateState(@Body() body: UpdateState) {
    const updatestate = await this.stateService.updateState(body);
    if (!updatestate) {
      throw new NotFoundException('No existe el estado');
    }
    return updatestate;
  }

  @Delete('/:id')
  async deleteState(@Param('id') id: number) {
    const deletestate = await this.stateService.deleteState(id);
    if (!deletestate) {
      throw new NotFoundException('No existe el tipo de documento');
    }
    return deletestate;
  }
}
