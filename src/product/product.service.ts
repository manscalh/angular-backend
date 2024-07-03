import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '@/database/prisma.service';
import { Prisma } from '@prisma/client';
import { createPaginator } from 'prisma-pagination';
import { ProductEntity } from './entities/product.entity';
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }
    async create(createProductDto: CreateProductDto) {
        createProductDto.createdAt = new Date();
        createProductDto.updatedAt = new Date();

        var obj = await this.prisma.product.findUnique({ where: { SKU: createProductDto.SKU, deleted: true } });

        if (obj) {

            var {
                family, SKU, weight, deleted, id, description, updatedAt, brandId, statusProduct
            } = obj;

            deleted = false;
            weight = new Decimal(createProductDto.weight);
            description = createProductDto.description;
            family = createProductDto.family;
            brandId = createProductDto.brandId;
            statusProduct = createProductDto.statusProduct;

            return this.update(id, { description, SKU, family, weight, deleted, updatedAt, brandId, statusProduct });
        }
        else {
            return this.prisma.product.create({ data: createProductDto });
        }
    }

    async findAllAutoComplete(filter?: string) {
        var dados: Array<any>  = await this.prisma.product.findMany({
            where: {
                SKU: {
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
            },
            include: {
                brand: true
            },
        });

        dados.forEach(data => {
            data.weightString = data.weight.toFixed(2);
        });

        return dados;

    }

    async findAll(page: number = 1, perPage: number = 5, filter?: string) {

        const paginate = createPaginator({ perPage });

        if (filter) {

            var dados = await paginate<ProductEntity, Prisma.ProductFindManyArgs>(
                this.prisma.product,
                {
                    where: {

                        OR: [
                            {
                                SKU: {
                                    contains: filter
                                }
                            },
                            {
                                description: {
                                    contains: filter
                                },
                            }
                        ],
                        AND: [{
                            OR: [
                                {
                                    deleted: null,
                                },
                                {
                                    deleted: false,
                                },
                            ]
                        }
                        ]
                    },
                    include: {
                        brand: true
                    },
                    orderBy: {
                        id: 'desc',
                    },
                },
                {
                    page,
                },
            );

            dados.data.forEach(data => {
                data.weightString = data.weight.toFixed(2);
            });

            return dados;

        }
        else {
            var dados = await paginate<ProductEntity, Prisma.ProductFindManyArgs>(
                this.prisma.product,
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
                    include: {
                        brand: true
                    },
                    orderBy: {
                        id: 'desc',
                    },
                },
                {
                    page,
                },
            );

            dados.data.forEach(data => {
                data.weightString = data.weight.toFixed(2);
            });

            return dados;
        }
    }

    async findOne(id: number) {
        const dados: any = await this.prisma.product.findUnique({ where: { id } });

        if (dados) {
            dados.weightString = (dados.weight as any).toFixed(2);
        }
        return dados;
    }

    async findOneWithRelations(id: number) {
        var brand = await this.prisma.brand.findUnique({
            where: { id }, include: {
                product: true
            }
        });

        return {
            brand: brand,
        };
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return this.prisma.product.update({ where: { id }, data: updateProductDto });
    }

    async remove(id: number) {
        // return this.prisma.product.delete({ where: { id } });
        var obj = await this.findOne(id);

        var { updatedAt, deleted } = obj;

        // active = false;
        deleted = true;

        return await this.prisma.product.update(
            {
                where: { id },
                data: {
                    updatedAt, deleted
                }
            }
        );

    }
}
