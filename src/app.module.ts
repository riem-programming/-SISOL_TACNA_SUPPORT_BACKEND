import { Module } from '@nestjs/common';
import { DocumentTypeModule } from './document_type/document_type.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './state/state.module';
import { PriorityModule } from './priority/priority.module';
import { RequestTypeModule } from './request_type/request_type.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: 'localhost',
      username: 'postgres',
      password: 'warpten177',
      database: 'SUPORT_SISOL',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DocumentTypeModule,
    StateModule,
    PriorityModule,
    RequestTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
