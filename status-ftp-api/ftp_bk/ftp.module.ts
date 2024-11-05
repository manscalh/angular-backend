/* eslint-disable prettier/prettier */
// src/ftp/ftp.module.ts
import { Module } from '@nestjs/common';
import { FtpService } from './ftp.service';
import { FtpController } from './ftp.controller';

@Module({
  controllers: [FtpController],
  providers: [FtpService],
})
export class FtpModule {}
