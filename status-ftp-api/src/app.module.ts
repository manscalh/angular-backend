/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FtpModule } from './ftp/ftp.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),FtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
