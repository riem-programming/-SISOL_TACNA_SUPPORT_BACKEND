import { Injectable } from '@nestjs/common';
import { CreateDocumentType } from './dto/create-document-type.dto';

@Injectable()
export class DocumentTypeService {
  getAllDocumentType() {
    return 'Estamos desde el servicio de document type';
  }

  getDocumentTypeById() {}

  getDocumentTypeByCode() {}

  createDocumentType(body: CreateDocumentType) {
    return body;
  }
}
