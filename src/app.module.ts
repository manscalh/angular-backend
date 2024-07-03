import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { ProfileModule } from './profile/profile.module';
import { ProductModule } from './product/product.module';
import { MenuModule } from './menu/menu.module';
import { PaginationModule } from './shared/pagination/pagination.module';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter, providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { BrandModule } from './brand/brand.module';
import { CircularityModule } from './circularity/circularity.module';
import { CustomerModule } from './customer/customer.module';
import { AuthADModule } from './authAD/authAD.module';

export const  user = process.env.TRADEIN_MAIL_USER;
export const  pass = process.env.TRADEIN_MAIL_PASS;
export const  email = process.env.TRADEIN_EMAIL;
export const  name = process.env.TRADEIN_NAME;
export const  host = process.env.TRADEIN_EMAIL_HOST;
export const  porta = parseInt(process.env.TRADEIN_EMAIL_PORT || "25");

export const transporter = porta == 25 ? {
  transport: {
    host: host,
    secure: false,
    port: porta,
    ignoreTLS: true,
  },
  defaults: {
    from: '"'+name+'" <'+email+'>',
  },
} : {
  transport: {
    host: host,
    secure: false, //regras de segurança do serviço smtp
    port: porta, // porta
    auth: {
      user: user,
      pass: pass
    }
  },
  defaults: { // configurações que podem ser padrões
    from: '"'+name+'" <'+email+'>',
  },
};

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AuthADModule,
    UsersModule,
    //MailerModule.forRoot(transporter),
    CompanyModule,
    ProfileModule,
    ProductModule,
    MenuModule,
    PaginationModule,
    BrandModule,
    CircularityModule,
    CustomerModule
  ],
  controllers: [AppController, ],
  providers: [AppService, providePrismaClientExceptionFilter()],
})
export class AppModule {}
