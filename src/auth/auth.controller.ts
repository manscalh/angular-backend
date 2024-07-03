import { Controller, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { API_CONSTANTS } from 'src/config/API.constants';
import { AuthResponseDTO } from './dto/response-auth.dto';
import { ChangePassDto } from './dto/change-pass.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('/'+API_CONSTANTS.API_VERSION+'/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthResponseDTO })
  async login(@Body() { email, password }: LoginDto) {
    return await this.authService.login(email, password);
  }

  @Patch('login/change-pass/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthResponseDTO })
  async changePass(@Param('id') id: string, @Body() changePass: ChangePassDto) {
    return await this.authService.changePass(id, changePass);
  }
}
