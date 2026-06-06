import { State } from 'src/state/state.entity';
import { DataSource } from 'typeorm';

export async function seedState(dataSource: DataSource) {
  const repository = dataSource.getRepository(State);

  const count = await repository.count();

  if (count > 0) {
    console.log('State ya existe');
    return;
  }

  // Así quedaría tu seed
  await repository.save([
    {
      name: 'Abierto',
      code: 'open',
      flow_order: 1,
      is_terminal: false,
      is_active: true,
    },
    {
      name: 'Iniciado',
      code: 'started',
      flow_order: 2,
      is_terminal: false,
      is_active: true,
    },
    {
      name: 'En Espera',
      code: 'waiting',
      flow_order: 3,
      is_terminal: false,
      is_active: true,
    },
    {
      name: 'Terminado',
      code: 'finished',
      flow_order: 4,
      is_terminal: true,
      is_active: true,
    },
    {
      name: 'Error',
      code: 'error',
      flow_order: null,
      is_terminal: true,
      is_active: true,
    },
    {
      name: 'Cancelado',
      code: 'cancelled',
      flow_order: null,
      is_terminal: true,
      is_active: true,
    },
  ]);

  console.log('State seed completado');
}
