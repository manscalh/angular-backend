/* eslint-disable prettier/prettier */
// src/ftp/ftp.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { FtpService } from './ftp.service';

@Controller('ftp')
export class FtpController {
  constructor(private readonly ftpService: FtpService) {}

  @Get('list')
  async listFiles(@Query('directory') directory: string) {
    return await this.ftpService.listFiles(directory);
  }
}
