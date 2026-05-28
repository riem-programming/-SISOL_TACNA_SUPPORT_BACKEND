import { SupportMode } from 'src/support_mode/support_mode.entity';
import { DataSource } from 'typeorm';

export async function seedSupportMode(dataSource: DataSource) {
  const repository = dataSource.getRepository(SupportMode);

  const count = await repository.count();

  if (count > 0) {
    console.log('SupportMode ya existe');
    return;
  }

  await repository.save([
    {
      short_name: 'Presencial',
      long_name: 'Soporte remoto por chat, email o videollamada',
      emoji: '💻',
      code: 'in-person',
      is_active: true,
    },
    {
      short_name: 'Virtual',
      long_name: 'El equipo de soporte acude en persona',
      emoji: '🚶',
      code: 'virtual',
      is_active: true,
    },
  ]);

  console.log('SupportMode seed completado');
}
