import { Injectable } from '@nestjs/common';
import { CreateCircularityDto } from './dto/create-circularity.dto';
import { UpdateCircularityDto } from './dto/update-circularity.dto';
import { PrismaService } from 'nestjs-prisma';
import { createPaginator } from 'prisma-pagination';
import { CircularityEntity } from './entities/circularity.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CircularityService {
    constructor(private prisma: PrismaService) {}
  async create(createCircularityDto: CreateCircularityDto) {

    const zeroPad = (num, places) => String(num).padStart(places, '0')

    createCircularityDto.createdAt = new Date();
    createCircularityDto.updatedAt = new Date();

    var number = (await this.prisma.circularity.count()) + 1;

    createCircularityDto.numberRecord = "HP"+createCircularityDto.createdAt.getFullYear()+zeroPad(number,6);

    return this.prisma.circularity.create({ data: createCircularityDto });
  }

  async nextStep(createCircularityDto: CreateCircularityDto) {

    const zeroPad = (num, places) => String(num).padStart(places, '0')

    createCircularityDto.createdAt = new Date();
    createCircularityDto.updatedAt = new Date();

    var number = (await this.prisma.circularity.count()) + 1;

    createCircularityDto.numberRecord = "HP"+createCircularityDto.createdAt.getFullYear()+zeroPad(number,6);

    return this.prisma.circularity.create({ data: createCircularityDto });
  }

  async findAll(page: number = 1, perPage: number = 5, filter?: string) {

    const paginate = createPaginator({ perPage });

    var dados = await paginate<CircularityEntity, Prisma.CircularityFindManyArgs>(
        this.prisma.circularity,
        {
        where: {
            serial: {
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
            product: {
              include:{
                brand: true
              }
            },
            circularityUpload: true,
            circulatityStatus: true,
            generalCondition: true,
            userCreated: true
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
      data.product.weightString = data.product.weight.toFixed(2);
    });


    return dados;
  }

  findOne(id: number) {
    return this.prisma.circularity.findUnique({ where: { id } });
  }

  update(id: number, updateCircularityDto: UpdateCircularityDto) {
    return this.prisma.circularity.update({ where: { id }, data: updateCircularityDto });
  }

  async remove(id: number) {
    var obj = await this.findOne(id);

    var {updatedAt, deleted} = obj;

    deleted = true;

    return await this.prisma.circularity.update(
        {
        where: { id },
        data: {
            updatedAt, deleted
            }
        }
    );
  }

  getGeneralCondition() {
    return this.prisma.circularityGeneralCondition.findMany();
  }
}
