import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '@/database/prisma.service';
import { Prisma } from '@prisma/client';
import { createPaginator } from 'prisma-pagination';
import { CompanyEntity } from './entities/company.entity';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) {}
    async create(createCompanyDto: CreateCompanyDto) {
        createCompanyDto.createdAt = new Date();
        createCompanyDto.updatedAt = new Date();

        var obj = await this.prisma.company.findUnique({ where: { CNPJ: createCompanyDto.CNPJ, deleted: true }});

        if (obj) {

            var {
                CNPJ, active, deleted, id, name, updatedAt
            } = obj;

            deleted = false;
            active = createCompanyDto.active;
            name = createCompanyDto.name;

            return this.update(id, {CNPJ, active, deleted, name, updatedAt});
        }
        else{
            return this.prisma.company.create({ data: createCompanyDto });
        }
    }

    findAllOld(page: number = 1, perPage: number = 5, filter?: string) {

        if (filter) {
            return this.prisma.company.findMany({
                where: {
                    name: {
                      contains: filter,
                    },
                    OR: [
                        {
                            deleted: null,
                        },
                        {
                            deleted: false,
                        },
                      ]
                  }
            });
        }
        else{
            return this.prisma.company.findMany(
            {
                where:
                {
                    OR: [
                    {
                        deleted: null,
                    },
                    {
                        deleted: false,
                    },
                  ]
                }
            });
        }

    }

    findAll(page: number = 1, perPage: number = 5, filter?: string) {

        const paginate = createPaginator({ perPage });

        if (filter) {
            return paginate<CompanyEntity, Prisma.CompanyFindManyArgs>(
                this.prisma.company,
                {
                 where: { name: {
                    contains: filter,
                  },
                  OR: [
                      {
                          deleted: null,
                      },
                      {
                          deleted: false,
                      },
                  ] },
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
            return paginate<CompanyEntity, Prisma.CompanyFindManyArgs>(
                this.prisma.company,
                {
                where: {
                    OR: [
                      {
                          deleted: null,
                      },
                      {
                          deleted: false,
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
    }

    findOne(id: number) {
        return this.prisma.company.findUnique({ where: { id } });
    }

    update(id: number, updateCompanyDto: UpdateCompanyDto) {
        return this.prisma.company.update({ where: { id }, data: updateCompanyDto });
    }

    async remove(id: number) {
        // return this.prisma.company.delete({ where: { id } });
        var obj = await this.findOne(id);

        var {active, updatedAt, deleted} = obj;

        active = false;
        deleted = true;

        return await this.prisma.company.update(
            {
            where: { id },
            data: {
                active, updatedAt, deleted
                }
            }
        );

    }
}
