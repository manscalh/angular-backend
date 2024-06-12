import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}
    async create(createProfileDto: CreateProfileDto) {

        createProfileDto.createdAt = new Date();
        createProfileDto.updatedAt = new Date();

        var {active, createdAt, name, updatedAt, arrayMenu, allowAdd, allowSave, allowEdit, allowDelete, allowView} = createProfileDto;

        var profileCreated = await this.prisma.profile.create({ data: {active, createdAt, name, updatedAt, allowAdd, allowSave, allowEdit, allowDelete, allowView} });

        for (let index = 0; index < arrayMenu.length; index++) {
            const element = arrayMenu[index];
            await this.prisma.profileAccess.create({data: {profileId: profileCreated.id, menuId: element}});
        }

        return profileCreated;
    }

    findAll(filter: string = "") {
        if (filter != "") {
            return this.prisma.profile.findMany({
                where:{
                    name:{
                        contains: filter
                    }
                }
            });
        }
        else{
            return this.prisma.profile.findMany();
        }

    }

    findOne(id: number) {
        return this.prisma.profile.findUnique({ where: { id } });
    }

    async update(id: number, updateProfileDto: UpdateProfileDto) {

        updateProfileDto.updatedAt = new Date();

        var {active, name, updatedAt, arrayMenu, allowAdd, allowSave, allowEdit, allowDelete, allowView} = updateProfileDto;

        await this.prisma.profileAccess.deleteMany({ where: { profileId: id } });

        for (let index = 0; index < arrayMenu.length; index++) {
            const element = arrayMenu[index];
            await this.prisma.profileAccess.create({data: {profileId: id, menuId: element}});
        }

        return this.prisma.profile.update({ where: { id }, data: {active, name, updatedAt, allowAdd, allowSave, allowEdit, allowDelete, allowView} });
    }

    remove(id: number) {
        return this.prisma.profile.delete({ where: { id } });
    }
}
