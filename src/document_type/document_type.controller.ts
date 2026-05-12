import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DocumentTypeService } from './document_type.service';
import { CreateDocumentType } from './dto/create-document-type.dto';

@Controller('document-type')
export class DocumentTypeController {
  private readonly documentTypeService: DocumentTypeService;

  constructor(documentTypeService: DocumentTypeService) {
    this.documentTypeService = documentTypeService;
  }

  @Get('/')
  getAllDocumentType() {
    return this.documentTypeService.getAllDocumentType();
  }

  @Get('/:id')
  getDocumentTypeById(@Param('id') id: number) {
    return `Param id: ${id}`;
  }

  @Get('/:code')
  getDocumentTypeByCode(@Param('code') code: string) {}

  @Post('/')
  createDocumentType(@Body('body') body: CreateDocumentType) {
    this.documentTypeService.createDocumentType(body);
  }

  @Put('/')
  updateDocumentType(@Body('body') body: any) {}

  @Delete('/:id')
  deleteDocumentType(@Param('id') id: number) {}
}
