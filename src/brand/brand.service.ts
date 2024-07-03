import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BrandService {
constructor(private prisma: PrismaService) {}
  async create(createBrandDto: CreateBrandDto) {
    createBrandDto.createdAt = new Date();
    createBrandDto.updatedAt = new Date();

    return this.prisma.brand.create({ data: createBrandDto });

  }

  findAll() {
    return this.prisma.brand.findMany(
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

  findOne(id: number) {
    return this.prisma.brand.findUnique({ where: { id } });
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.prisma.brand.update({ where: { id }, data: updateBrandDto });
  }

  async remove(id: number) {

     // return this.prisma.company.delete({ where: { id } });
     var obj = await this.findOne(id);

     var {updatedAt, deleted} = obj;

     deleted = true;

     return await this.prisma.company.update(
         {
         where: { id },
         data: {
             updatedAt, deleted
            }
         }
     );
  }
}
