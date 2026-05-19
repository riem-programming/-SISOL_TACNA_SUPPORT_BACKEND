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
import { SupportModeService } from './support_mode.service';
import { CreateSupportMode } from './dto/create-support-mode.dto';
import { UpdateSupportMode } from './dto/update-support-mode.dto';

@Controller('support-mode')
export class SupportModeController {
  private readonly supportModeService: SupportModeService;

  constructor(supportModeService: SupportModeService) {
    this.supportModeService = supportModeService;
  }

  @Get('/')
  async getAllsupportMode() {
    return await this.supportModeService.getAllsupportMode();
  }

  @Get('/:id')
  async getsupportModeById(@Param('id') id: string) {
    const currentsupportMode = await this.supportModeService.getsupportModeById(
      Number(id),
    );
    if (!currentsupportMode) {
      throw new NotFoundException('No existe el modo de soporte');
    }
    return currentsupportMode;
  }

  @Post('/')
  async createsupportMode(@Body() body: CreateSupportMode) {
    return await this.supportModeService.createsupportMode(body);
  }

  @Put('/')
  async updatesupportMode(@Body() body: UpdateSupportMode) {
    const updatesupportMode =
      await this.supportModeService.updatesupportMode(body);
    if (!updatesupportMode) {
      throw new NotFoundException('No existe el estado');
    }
    return updatesupportMode;
  }

  @Delete('/:id')
  async deletesupportMode(@Param('id') id: number) {
    const deletesupportMode =
      await this.supportModeService.deletesupportMode(id);
    if (!deletesupportMode) {
      throw new NotFoundException('No existe el estado');
    }
    return deletesupportMode;
  }
}
