import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { API_CONSTANTS } from '@/config/API.constants';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Route, RouteGuard } from '@/auth/user.decorator';

@Controller('/'+API_CONSTANTS.API_VERSION+'/group-access')
@ApiTags('Group Access')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/group-access/details'])
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/group-access'])
  @ApiQuery({
    name: "filter",
    type: String,
    description: "A parameter. Optional",
    required: false
  })
  findAll(@Query("filter") filter: string = "") {
    return this.profileService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/group-access/details'])
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/group-access/details'])
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/group-access'])
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
