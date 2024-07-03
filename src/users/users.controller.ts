import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from './entities/user.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { API_CONSTANTS } from 'src/config/API.constants';
import { Route, RouteGuard } from '@/auth/user.decorator';
import { ApiPaginatedResponse } from '@/shared/pagination/pagination.decorator';

@Controller('/'+API_CONSTANTS.API_VERSION+'/user')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/user/details','/management/myusers/create'])
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/user'])
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiPaginatedResponse(UserEntity)
  @ApiQuery({
    name: "filter",
    type: String,
    description: "A parameter. Optional",
    required: false
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 5,
    @Query("filter") filter: string = ""
  ) {
    return this.usersService.findAll(page, perPage, filter);
  }

  @Get('/company/:idCompany')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/user','/management/myusers'])
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiPaginatedResponse(UserEntity)
  @ApiQuery({
    name: "filter",
    type: String,
    description: "A parameter. Optional",
    required: false
  })
  findAllByCompany(
    @Param('idCompany') idCompany: number,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 5,
    @Query("filter") filter: string = ""
  ) {
    return this.usersService.findAllByCompany(page, perPage, filter, parseInt(""+idCompany));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/user/details'])
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/user/details'])
  @ApiCreatedResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/user'])
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
