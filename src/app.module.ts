import { Module } from '@nestjs/common';
import { DocumentTypeModule } from './document_type/document_type.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './state/state.module';
import { PriorityModule } from './priority/priority.module';
import { RequestTypeModule } from './request_type/request_type.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VoucherRequestModule } from './voucher_request/voucher_request.module';
import { VoucherActionTypeModule } from './voucher_action_type/voucher_action_type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    DocumentTypeModule,
    StateModule,
    PriorityModule,
    RequestTypeModule,
    TicketModule,
    UserModule,
    AuthModule,
    VoucherRequestModule,
    VoucherActionTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
