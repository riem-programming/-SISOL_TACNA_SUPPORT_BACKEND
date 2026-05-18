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
import { SystemRoleService } from './system_role.service';
import { CreateSystemRole } from './dto/create-system-role.dto';
import { UpdateSystemRole } from './dto/update-system-role.dto';

@Controller('system-role')
export class SystemRoleController {
  private readonly systemRoleService: SystemRoleService;

  constructor(systemRoleService: SystemRoleService) {
    this.systemRoleService = systemRoleService;
  }

  @Get('/')
  async getAllsystemRole() {
    return await this.systemRoleService.getAllsystemRole();
  }

  @Get('/:id')
  async getsystemRoleById(@Param('id') id: string) {
    const currentsystemRole = await this.systemRoleService.getsystemRoleById(
      Number(id),
    );
    if (!currentsystemRole) {
      throw new NotFoundException('No existe el estado');
    }
    return currentsystemRole;
  }

  @Post('/')
  async createsystemRole(@Body() body: CreateSystemRole) {
    return await this.systemRoleService.createsystemRole(body);
  }

  @Put('/')
  async updatesystemRole(@Body() body: UpdateSystemRole) {
    const updatesystemRole =
      await this.systemRoleService.updatesystemRole(body);
    if (!updatesystemRole) {
      throw new NotFoundException('No existe el estado');
    }
    return updatesystemRole;
  }

  @Delete('/:id')
  async deletesystemRole(@Param('id') id: number) {
    const deletesystemRole = await this.systemRoleService.deletesystemRole(id);
    if (!deletesystemRole) {
      throw new NotFoundException('No existe el estado');
    }
    return deletesystemRole;
  }
}
