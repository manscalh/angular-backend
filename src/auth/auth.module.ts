import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { PrismaService } from 'src/database/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { API_CONSTANTS } from 'src/config/API.constants';
import { APP_GUARD } from '@nestjs/core';
import { RouteGuard } from './user.decorator';

export const jwtSecret = API_CONSTANTS.API_JWT_SECRET;

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '60m' }, // e.g. 30s, 7d, 24h
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy,{
    provide: APP_GUARD,
    useClass: RouteGuard,
  }],
})
export class AuthModule {}
