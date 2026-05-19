import { SystemRole } from 'src/system_role/system_role.entity';
import { DataSource } from 'typeorm';

export async function seedSystemRole(dataSource: DataSource) {
  const repository = dataSource.getRepository(SystemRole);

  const count = await repository.count();

  if (count > 0) {
    console.log('SystemRole ya existe');
    return;
  }

  await repository.save([
    {
      short_name: 'Cajero',
      long_name: 'Personal encargado de caja y procesos de cobro',
      is_active: true,
    },
    {
      short_name: 'Coord. Médico',
      long_name: 'Coordinador médico responsable de validaciones clínicas',
      is_active: true,
    },
    {
      short_name: 'Archivo',
      long_name: 'Personal encargado del área de archivo y documentación',
      is_active: true,
    },
    {
      short_name: 'Resp. Atención',
      long_name: 'Responsable del área de atención al paciente',
      is_active: true,
    },
    {
      short_name: 'Otros',
      long_name: 'Otros roles no categorizados dentro del sistema',
      is_active: true,
    },
  ]);

  console.log('SystemRole seed completado');
}
