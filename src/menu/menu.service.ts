import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '@/database/prisma.service';
import { MenuDTO, MenuItemDTO } from '@/auth/dto/response-auth.dto';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';
import { MenuEntity } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}
  create(createMenuDto: CreateMenuDto) {
    createMenuDto.createdAt = new Date();
    createMenuDto.updatedAt = new Date();

    var {
        active, createdAt, deleted, description, image, image_active, isClick, order, showHome, showSideBar, updatedAt, url, idDad
    } = createMenuDto;

    if (idDad == 0) {
        idDad = null;
    }

    return this.prisma.menu.create({ data: {
        active, createdAt, deleted, description, image, image_active, isClick, order, showHome, showSideBar, updatedAt, url, idDad
    }  });
  }

  findAll(page: number = 1, perPage: number = 10, filter: string = "") {
    const paginate = createPaginator({ perPage });

    if (filter != "") {
        return paginate<MenuEntity, Prisma.MenuFindManyArgs>(
            this.prisma.menu,
            {
             where: {

                description: {
                    contains: filter,
                },
                AND: [
                    {
                        idDad: null,
                    },
                    {
                        active: true,
                    },
                ]
            },
              orderBy: {
                id: 'desc',
              },
            },
            {
              page,
            },
          );
    }
    else{
        return paginate<MenuEntity, Prisma.MenuFindManyArgs>(
            this.prisma.menu,
            {
             where: { idDad: null, active: true },
              orderBy: {
                id: 'desc',
              },
            },
            {
              page,
            },
          );
    }
    // return this.prisma.menu.findMany({ where: { idDad: null, active: true } });
  }

  findAllChildren(id: number) {
    return this.prisma.menu.findMany({ where: { idDad: id, active: true } });
  }

  findOne(id: number) {
    return this.prisma.menu.findUnique({ where: { id } });
  }

  async getMenuSubitens(idPerfil: number){
    var menuReturn = Array<MenuDTO>();
    const menu = await this.prisma.menu.findMany({ where: { idDad: null, active: true } });

    var profileAccess = await this.prisma.profileAccess.findMany({ where: { profileId: idPerfil }, include: {
        menu: true
    }});

    //Source
    for (let index = 0; index < menu.length; index++) {
        const el = menu[index];
        const subitems = await this.getChildren(el.id, profileAccess);

        const check = profileAccess.filter(a => a.menuId == el.id).length > 0 ? true : false;

        menuReturn.push({
            id : el.id,
            active : el.active,
            image : el.image,
            image_active : el.image_active,
            isClick : el.isClick,
            name : el.description,
            showHome : el.showHome,
            showSideBar : el.showSideBar,
            url : el.url,
            idDad : el.idDad,
            subitens: subitems,
            check: check
        });
    }

    return {source: menuReturn};
  }

  async getChildren(idDad: number, profileAccess: any): Promise<MenuDTO[]>{
    var menuSub = await this.prisma.menu.findMany({ where: { idDad: idDad, active: true } });

    const menuItem = Array<MenuDTO>();

    for (let j = 0; j < menuSub.length; j++) {
        const elj = menuSub[j];

        const checkj = profileAccess.filter(a => a.menu.id == elj.id).length > 0 ? true : false;

        menuItem.push(
            {
                id : elj.id,
                active : elj.active,
                image : elj.image,
                image_active : elj.image_active,
                isClick : elj.isClick,
                name : elj.description,
                showHome : elj.showHome,
                showSideBar : elj.showSideBar,
                url : elj.url,
                idDad : elj.idDad,
                check: checkj,
                subitens: await this.getChildren(elj.id, profileAccess)
            }
        );
    }

    return menuItem;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {

    var {
        idDad, active, createdAt, description, image, image_active, isClick, showHome, showSideBar, updatedAt, url
    } = updateMenuDto;

    if (idDad == 0) {
        idDad = null;
    }

    return this.prisma.menu.update({ where: { id }, data: {
        idDad, active, createdAt, description, image, image_active, isClick, showHome, showSideBar, updatedAt, url
    } });
  }

  async remove(id: number) {
    var obj = await this.findOne(id);

    var {
        idDad, active, createdAt, description, image, image_active, isClick, showHome, showSideBar, updatedAt, url
    } = obj;

    active = false;

    // return this.prisma.menu.delete({ where: { id } });

    return await this.prisma.menu.update({ where: { id }, data: {
        idDad, active, createdAt, description, image, image_active, isClick, showHome, showSideBar, updatedAt, url
    } });
  }
}
