import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CircularityService } from './circularity.service';
import { CreateCircularityDto } from './dto/create-circularity.dto';
import { UpdateCircularityDto } from './dto/update-circularity.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { API_CONSTANTS } from '@/config/API.constants';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { RouteGuard } from '@/auth/user.decorator';
import { ApiPaginatedResponse } from '@/shared/pagination/pagination.decorator';
import { CircularityEntity } from './entities/circularity.entity';

@Controller('/'+API_CONSTANTS.API_VERSION+'/circularity')
@ApiTags('Circularity')
export class CircularityController {
  constructor(private readonly circularityService: CircularityService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
  create(@Body() createCircularityDto: CreateCircularityDto) {
    return this.circularityService.create(createCircularityDto);
  }

  @Post('/nextStep')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
  nextStep(@Body() createCircularityDto: CreateCircularityDto) {
    return this.circularityService.nextStep(createCircularityDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
  @ApiPaginatedResponse(CircularityEntity)
  @ApiQuery({
    name: "filter",
    type: String,
    description: "A parameter. Optional",
    required: false
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 5,
    @Query("filter") filter?: string
  ) {
    return this.circularityService.findAll(page, perPage, filter);
  }

  @Get('/GeneralCondition')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
  getGeneralCondition() {
    return this.circularityService.getGeneralCondition();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.circularityService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateCircularityDto: UpdateCircularityDto) {
    return this.circularityService.update(+id, updateCircularityDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.circularityService.remove(+id);
  }
}
