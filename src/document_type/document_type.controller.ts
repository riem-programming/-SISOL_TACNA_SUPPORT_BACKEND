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
import { DocumentTypeService } from './document_type.service';
import { CreateDocumentType } from './dto/create-document-type.dto';
import { UpdateDocumentType } from './dto/update-document-type.dto';

@Controller('document-type')
export class DocumentTypeController {
  private readonly documentTypeService: DocumentTypeService;

  constructor(documentTypeService: DocumentTypeService) {
    this.documentTypeService = documentTypeService;
  }

  @Get('/')
  async getAllDocumentType() {
    return await this.documentTypeService.getAllDocumentType();
  }

  @Get('/:id')
  async getDocumentTypeById(@Param('id') id: string) {
    const currentDocumentType =
      await this.documentTypeService.getDocumentTypeById(Number(id));
    if (!currentDocumentType) {
      throw new NotFoundException('No existe el tipo de documento');
    }
    return currentDocumentType;
  }

  @Post('/')
  async createDocumentType(@Body() body: CreateDocumentType) {
    return await this.documentTypeService.createDocumentType(body);
  }

  @Put('/')
  async updateDocumentType(@Body() body: UpdateDocumentType) {
    const updateDocumentType =
      await this.documentTypeService.updateDocumentType(body);
    if (!updateDocumentType) {
      throw new NotFoundException('No existe el tipo de documento');
    }
    return updateDocumentType;
  }

  @Delete('/:id')
  async deleteDocumentType(@Param('id') id: number) {
    const deleteDocumentType =
      await this.documentTypeService.deleteDocumentType(id);
    if (!deleteDocumentType) {
      throw new NotFoundException('No existe el tipo de documento');
    }
    return deleteDocumentType;
  }
}
