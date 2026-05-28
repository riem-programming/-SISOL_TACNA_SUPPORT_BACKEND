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
      short_name: 'Baja',
      long_name: 'Puedo esperar hasta mañana',
      emoji: '🟢',
      value: 0,
      code: 'low',
      is_active: true,
    },
    {
      short_name: 'Media',
      long_name: 'Requiere atención durante mi turno',
      emoji: '🟠',
      value: 1,
      code: 'medium',
      is_active: true,
    },
    {
      short_name: 'Alta',
      long_name: 'Requiero atención inmediata',
      emoji: '🔴',
      value: 2,
      code: 'high',
      is_active: true,
    },
    // {
    //   name: 'Crítica',
    //   value: 3,
    //   code: 'critical',
    //   is_active: true,
    // },
  ]);

  console.log('Priority seed completado');
}
