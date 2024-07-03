import { Module } from '@nestjs/common';
import { CircularityService } from './circularity.service';
import { CircularityController } from './circularity.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [CircularityController],
  providers: [CircularityService, PrismaService],
})
export class CircularityModule {}
