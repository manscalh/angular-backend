import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpStatus, HttpException } from '@nestjs/common';
import { API_CONSTANTS } from '@/config/API.constants';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CustomerEntity } from './entities/customer.entity';
import { ApiPaginatedResponse } from '@/shared/pagination/pagination.decorator';
import { Route, RouteGuard } from '@/auth/user.decorator';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('/'+API_CONSTANTS.API_VERSION+'/customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/customer/details'])
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/customer'])
  @ApiPaginatedResponse(CustomerEntity)
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
    return this.customerService.findAll(page, perPage, filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/customer/details'])
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/customer/details'])
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RouteGuard)
  @ApiBearerAuth()
//   @Route(['/management/customer'])
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
