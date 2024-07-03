import { UsersModule } from "@/users/users.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthADcontroller } from "./authAD.controller";
import { AuthADService } from "./authAD.service";
import { API_CONSTANTS } from 'src/config/API.constants';
import { JwtStrategy } from "@/auth/jwt.strategy";

export const jwtSecret = API_CONSTANTS.API_JWT_SECRET;


@Module({

    imports:[ JwtModule.register({
        secret: jwtSecret,
        signOptions: { expiresIn: '60m' },
    }), 
    UsersModule,
    ],
    controllers:[AuthADcontroller],
    providers:[AuthADService, JwtStrategy],
    exports:[AuthADService],
})

export class AuthADModule {}