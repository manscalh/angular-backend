import { Module } from '@nestjs/common';
import {  CustomerController } from './customer.controller';
import { PrismaService } from '@/database/prisma.service';
import { CustomerService } from './customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService],
})
export class CustomerModule {}
