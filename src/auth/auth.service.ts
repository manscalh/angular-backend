import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { AuthResponseDTO, MenuDTO, MenuItemDTO } from './dto/response-auth.dto';
import { UserResponseDTO } from '@/users/dto/response-user.dto';
import { ChangePassDto } from './dto/change-pass.dto';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private userService: UsersService) {}

  async login(email: string, password: string): Promise<AuthResponseDTO> {

    const user = await this.prisma.user.findUnique({ where: { email: email }, include: {
        company: true,
        profile: true
    }});

    if (!user) {
    //   throw new NotFoundException(`Usuário inválido: ${email}`);
      throw new NotFoundException(`Usuário inválido.`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida.');
    }

    if (!user.active) {
        throw new UnauthorizedException('Usuário não autorizado.');
    }

    if (!user.company.active) {
        throw new UnauthorizedException('Parceiro não autorizado.');
    }

    if (!user.profile.active) {
        throw new UnauthorizedException('Grupo de acesso não autorizado.');
    }

    user.password = "";

    const userReturn = new UserResponseDTO(user, user.profile, user.company);
    const menuReturn = Array<MenuDTO>();
    const menuHomeReturn = Array<MenuDTO>();

    const profileAccess = await this.prisma.profileAccess.findMany({ where: { profileId: user.profileId }, include: {
        menu: true
    }});

    const menu = profileAccess.filter(a => a.menu.idDad == null && a.menu.active == true);

    for (let index = 0; index < menu.length; index++) {
        const el = menu[index];
        const subitems = this.getChildren(el.menu.id, profileAccess);

        menuReturn.push({
            id : el.menu.id,
            active : el.menu.active,
            image : el.menu.image,
            image_active : el.menu.image_active,
            isClick : el.menu.isClick,
            name : el.menu.description,
            showHome : el.menu.showHome,
            showSideBar : el.menu.showSideBar,
            url : el.menu.url,
            idDad : el.menu.idDad,
            subitens: subitems,
            classActive: 'no-active'
        });
    }

    for (let index = 0; index < profileAccess.length; index++) {
        const el = profileAccess[index];

        if (el.menu.active == true) {
            menuHomeReturn.push({
                id : el.menu.id,
                active : el.menu.active,
                image : el.menu.image,
                image_active : el.menu.image_active,
                isClick : el.menu.isClick,
                name : el.menu.description,
                showHome : el.menu.showHome,
                showSideBar : el.menu.showSideBar,
                url : el.menu.url,
                idDad : el.menu.idDad
            })
        }

    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user: userReturn,
      menu: menuReturn,
      menuHome: menuHomeReturn
    };

  }

  async changePass(id: string, changePass: ChangePassDto): Promise<any> {

    const user = await this.prisma.user.findUnique({ where: { id: id }});

    if (!user) {
      throw new NotFoundException(`Usuário inválido.`);
    }

    var { resetPasswordNextLogin, password } = user;

    password = changePass.password;
    resetPasswordNextLogin = false;

    const alterUser = await this.userService.updatePass(id, { resetPasswordNextLogin, password });

    return this.login(user.email, changePass.password);
  }

  getChildren(idDad: number, profileAccess: any): MenuDTO[]{

    var menuSub = profileAccess.filter(a => a.menu.idDad == idDad && a.menu.active == true);

    const menuItem = Array<MenuDTO>();

    for (let j = 0; j < menuSub.length; j++) {
        const elj = menuSub[j];

        var subitems = this.getChildren(elj.menu.id, profileAccess);

        menuItem.push(
            {
                id : elj.menu.id,
                active : elj.menu.active,
                image : elj.menu.image,
                image_active : elj.menu.image_active,
                isClick : elj.menu.isClick,
                name : elj.menu.description,
                showHome : elj.menu.showHome,
                showSideBar : elj.menu.showSideBar,
                url : elj.menu.url,
                idDad : elj.menu.idDad,
                subitens: subitems,
                classActive: 'no-active'
            }
        );
    }

    return menuItem;
  }
}
