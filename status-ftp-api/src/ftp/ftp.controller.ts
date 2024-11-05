/* eslint-disable prettier/prettier */
// src/ftp/ftp.controller.ts
import { Controller, Get } from '@nestjs/common';
import { FtpService } from './ftp.service';

@Controller('ftp')
export class FtpController {
  constructor(private readonly ftpService: FtpService) {}

  @Get('list')
  async listFiles(): Promise<any[]> {
    return await this.ftpService.listFiles();
  }

}
