import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { API_CONSTANTS } from '@/config/API.constants';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ApiPaginatedResponse } from '@/shared/pagination/pagination.decorator';
import { MenuEntity } from './entities/menu.entity';
import { Route, RouteGuard } from '@/auth/user.decorator';

@Controller('/'+API_CONSTANTS.API_VERSION+'/menu')
@ApiTags('Menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/menu/details'])
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
  @ApiPaginatedResponse(MenuEntity)
//   @Route(['/management/menu'])
  @ApiQuery({
    name: "filter",
    type: String,
    description: "A parameter. Optional",
    required: false
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Query("filter") filter: string = ""
  ) {
    return this.menuService.findAll(page, perPage, filter);
  }

  @Get('/children/:id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/menu/details'])
  findAllChildren(@Param('id') id: string) {
    if (id != "undefined")
        return this.menuService.findAllChildren(+id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/menu/details'])
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Get('/menu-subitens/:idPerfil')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
  @Route(['/management/menu'])
  getMenuSubitens(@Param('idPerfil') idPerfil: string) {
    return this.menuService.getMenuSubitens(+idPerfil);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/menu'])
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/menu'])
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
