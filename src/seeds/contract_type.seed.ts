import { ContractType } from 'src/contract_type/contract_type.entity';
import { DataSource } from 'typeorm';

export async function seedContractType(dataSource: DataSource) {
  const repository = dataSource.getRepository(ContractType);

  const count = await repository.count();

  if (count > 0) {
    console.log('ContractType ya existe');
    return;
  }

  await repository.save([
    {
      long_name: 'PERSONAL SISOL',
      short_name: 'SISOL',
      code: 'local',
      is_active: true,
    },
    {
      long_name: 'PERSONAL ASOCIADO / EXTERNO',
      short_name: 'ASOCIADO',
      code: 'external',
      is_active: true,
    },
  ]);

  console.log('ContractType seed completado');
}
