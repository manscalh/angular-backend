import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { createPaginator } from 'prisma-pagination';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomerService {
    
    constructor(private prisma: PrismaService) {}
    async create (createCustomerDto: CreateCustomerDto) {
        createCustomerDto.createdAt = new Date();        

        // TO DO: Continuar ajustes da rota para CRUD da table Tb_SSD_FrontEnd_Customer_X_Partnumber
        var obj = await this.prisma.tb_SSD_FrontEnd_Customer_X_Partnumber.findUnique({ where: { partnumber: createCustomerDto.partnumber }});

        if (obj) {

            var { partnumber,id,customer, createdAt } = obj;

            return this.update(id, {partnumber, customer, createdAt});
        }
        else{
            return this.prisma.tb_SSD_FrontEnd_Customer_X_Partnumber.create({ data: createCustomerDto });
        }
    }

    findAllOld(page: number = 1, perPage: number = 5, filter?: string) {

        if (filter) {
            return this.prisma.tb_SSD_FrontEnd_Customer_X_Partnumber.findMany({
                where: {
                    partnumber: {
                      contains: filter,
                    },
                  }
            });
        }
        else{
            return this.prisma.tb_SSD_FrontEnd_Customer_X_Partnumber.findMany({ 
                /* where:
                {
                    OR: [
                    {
                        deleted: null,
                    },
                    {
                        deleted: false,
                    },
                  ]
                } */
            });
        }

    }

    findAll(page: number = 1, perPage: number = 5, filter?: string) {

        const paginate = createPaginator({ perPage });

        if (filter) {
            return paginate<CustomerEntity, Prisma.Tb_SSD_FrontEnd_Customer_X_PartnumberFindManyArgs>(
                this.prisma.tb_SSD_FrontEnd_Customer_X_Partnumber,
                {
                    where: { partnumber: {
                        contains: filter,
                        },
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
            return paginate<CustomerEntity, Prisma.Tb_SSD_FrontEnd_Customer_X_PartnumberFindManyArgs>(
                this.prisma.tb_SSD_FrontEnd_Customer_X_Partnumber,
                {
                where: { id:{} 
                    /* OR: [
                      {
                          deleted: null,
                      },
                      {
                          deleted: false,
                      },
                  ] */
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
    }

    findOne(id: number) {
        return this.prisma.tb_SSD_FrontEnd_Customer_X_Partnumber.findUnique({ where: { id } });
    }

    update(id: number, updateCustomerDto: UpdateCustomerDto) {
        return this.prisma.tb_SSD_FrontEnd_Customer_X_Partnumber.update({ where: { id }, data: updateCustomerDto });
    }

    async remove(id: number) {
        // return this.prisma.customer.delete({ where: { id } });
        var obj = await this.findOne(id);

        var {customer, partnumber, createdAt} = obj;

       return await this.prisma.tb_SSD_FrontEnd_Customer_X_Partnumber.update(
            {
            where: { id },
            data: {
                customer, partnumber, createdAt
                }
            }
        );
    }
}
