import { Priority } from 'src/priority/priority.entity';
import { DataSource } from 'typeorm';

export async function seedPriority(dataSource: DataSource) {
  const repository = dataSource.getRepository(Priority);

  const count = await repository.count();

  if (count > 0) {
    console.log('Priority ya existe');
    return;
  }

  await repository.save([
    {
      name: 'Baja',
      value: 0,
      code: 'low',
      is_active: true,
    },
    {
      name: 'Media',
      value: 1,
      code: 'medium',
      is_active: true,
    },
    {
      name: 'Alta',
      value: 2,
      code: 'high',
      is_active: true,
    },
    {
      name: 'Crítica',
      value: 3,
      code: 'critical',
      is_active: true,
    },
  ]);

  console.log('Priority seed completado');
}
