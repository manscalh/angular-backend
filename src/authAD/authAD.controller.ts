import { Body, Controller, Post } from "@nestjs/common";
import { AuthADService } from "./authAD.service";
import { LoginAuthADDto } from "./dto/login-authAD.dto";
import { API_CONSTANTS } from 'src/config/API.constants';
import { ApiTags } from "@nestjs/swagger";


@Controller('/'+API_CONSTANTS.API_VERSION+'/AuthAD')
@ApiTags('AuthAD')

export class AuthADcontroller{

    constructor (readonly authADService: AuthADService ) {}

    @Post('checkAD')
    async login (@Body() {username, password}: LoginAuthADDto ){
        return await this.authADService.isValiteAD(username,password);
    }

}