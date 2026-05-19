import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';

import { seedPriority } from './priority.seed';
import { seedState } from './state.seed';
import { seedRequestType } from './request_type.seed';
import { seedSystemRole } from './system_role.seed';
import { seedDocumentType } from './document_type.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(DataSource);

  try {
    await seedPriority(dataSource);
    await seedState(dataSource);
    await seedRequestType(dataSource);
    await seedSystemRole(dataSource);
    await seedDocumentType(dataSource);

    console.log('Todos los seeds ejecutados correctamente');
  } catch (error) {
    console.error('Error ejecutando seeds:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
