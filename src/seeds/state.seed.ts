import { State } from 'src/state/state.entity';
import { DataSource } from 'typeorm';

export async function seedState(dataSource: DataSource) {
  const repository = dataSource.getRepository(State);

  const count = await repository.count();

  if (count > 0) {
    console.log('State ya existe');
    return;
  }

  await repository.save([
    {
      name: 'Abierto',
      code: 'open',
      is_active: true,
    },
    {
      name: 'Iniciado',
      code: 'started',
      is_active: true,
    },
    {
      name: 'En Espera',
      code: 'waiting',
      is_active: true,
    },
    {
      name: 'Error',
      code: 'error',
      is_active: true,
    },
    {
      name: 'Terminado',
      code: 'finished',
      is_active: true,
    },
    {
      name: 'Cancelado',
      code: 'cancelled',
      is_active: true,
    },
  ]);

  console.log('State seed completado');
}
