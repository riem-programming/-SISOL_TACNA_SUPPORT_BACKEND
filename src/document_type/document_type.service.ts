import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentType } from './dto/create-document-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentType } from './document_type.entity';
import { Repository } from 'typeorm';
import { UpdateDocumentType } from './dto/update-document-type.dto';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
  ) {}

  getAllDocumentType() {
    return this.documentTypeRepository.find();
  }

  getDocumentTypeById(id: number) {
    return this.documentTypeRepository.findOneBy({ id });
  }

  async createDocumentType(body: CreateDocumentType) {
    const existingDocumentTypeCode =
      await this.documentTypeRepository.findOneBy({ code: body.code });
    if (existingDocumentTypeCode) {
      throw new NotFoundException(
        'El codigo del tipo de documento, ya se encuentra registrado',
      );
    }

    const newDocumentType = this.documentTypeRepository.create(body);
    return this.documentTypeRepository.save(newDocumentType);
  }

  async updateDocumentType(body: UpdateDocumentType) {
    const currentDocumentType = await this.getDocumentTypeById(body.id);
    if (!currentDocumentType) return null;

    if (body.code && currentDocumentType.code !== body.code) {
      const existingDocumentTypeCode =
        await this.documentTypeRepository.findOneBy({ code: body.code });
      if (existingDocumentTypeCode) {
        throw new NotFoundException(
          'El nuevo codigo del tipo de documento, ya se encuentra registrado',
        );
      }
    }

    Object.assign(currentDocumentType, body);
    return await this.documentTypeRepository.save(currentDocumentType);
  }

  async deleteDocumentType(id: number) {
    const currentDocumentType = await this.getDocumentTypeById(id);
    if (!currentDocumentType) return null;

    await this.documentTypeRepository.delete({
      id: currentDocumentType.id,
    });
    return currentDocumentType;
  }
}
