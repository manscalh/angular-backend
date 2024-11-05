/* eslint-disable prettier/prettier */
// src/ftp/ftp.service.ts
import { Injectable } from '@nestjs/common';
import * as ftp from 'basic-ftp';

@Injectable()
export class FtpService {
  private client: ftp.Client;

  constructor() {
    this.client = new ftp.Client();
  }

  async listFiles(directory: string): Promise<string[]> {
    try {
      await this.client.access({
        host: 'ftp.example.com',
        user: 'username',
        password: 'password',
      });
      const list = await this.client.list(directory);
      return list.map(file => file.name);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to list files');
    } finally {
      this.client.close();
    }
  }
}
