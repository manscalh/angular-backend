/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as ftp from 'basic-ftp';


@Injectable()
export class FtpService {
  private client: ftp.Client;

  constructor() {
    this.client = new ftp.Client();
  }

  async listFiles(): Promise<any[]> {
    try {
      await this.client.access({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });
      
      const path = process.env.DB_PATH
      const list = await this.client.list(path);
      
      return list.map(file => ({
        name: file.name,
        size: file.size,
        date: file.rawModifiedAt,
        
    }));

    } catch (err) {
      console.error(err);
      throw new Error('Failed to list files');
    } finally {
      this.client.close();
    }
  }
}
