import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpStatus, HttpException } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { API_CONSTANTS } from '@/config/API.constants';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CompanyEntity } from './entities/company.entity';
import { ApiPaginatedResponse } from '@/shared/pagination/pagination.decorator';
import { RouteGuard } from '@/auth/user.decorator';

@Controller('/'+API_CONSTANTS.API_VERSION+'/company')
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/company/details'])
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/company'])
  @ApiPaginatedResponse(CompanyEntity)
  @ApiQuery({
    name: "filter",
    type: String,
    description: "A parameter. Optional",
    required: false
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 5,
    @Query("filter") filter?: string) {
    return this.companyService.findAll(page, perPage, filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/company/details'])
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/company/details'])
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/company'])
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
