import { DocumentType } from 'src/document_type/document_type.entity';
import { DataSource } from 'typeorm';

export async function seedDocumentType(dataSource: DataSource) {
  const repository = dataSource.getRepository(DocumentType);

  const count = await repository.count();

  if (count > 0) {
    console.log('DocumentType ya existe');
    return;
  }

  await repository.save([
    {
      code: '01',
      short_name: 'DNI',
      long_name: 'DOCUMENTO NACIONAL DE IDENTIDAD',
      character_count: 8,
      is_active: true,
    },
    {
      code: '02',
      short_name: 'CARNET EXTRANJERÍA',
      long_name: 'CARNÉ DE EXTRANJERÍA',
      character_count: 12,
      is_active: true,
    },
    {
      code: '05',
      short_name: 'PASAPORTE',
      long_name: 'PASAPORTE',
      character_count: 12,
      is_active: true,
    },
    {
      code: '06',
      short_name: 'RUC',
      long_name: 'REGISTRO ÚNICO DE CONTRIBUYENTES',
      character_count: 11,
      is_active: true,
    },
    {
      code: '07',
      short_name: 'CARNET IDENTIDAD',
      long_name:
        'CARNÉ DE IDENTIDAD EMITIDO POR MINISTERIO DE RELACIONES EXTERIORES',
      character_count: 15,
      is_active: true,
    },
    {
      code: '08',
      short_name: 'CARNET PERMANENCIA',
      long_name: 'CARNÉ DE PERMISO TEMPORAL DE PERMANENCIA',
      character_count: 15,
      is_active: true,
    },
  ]);

  console.log('DocumentType seed completado');
}
