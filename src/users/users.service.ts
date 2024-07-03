import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
// import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { createPaginator } from 'prisma-pagination';
import { UserEntity } from './entities/user.entity';
import { Prisma } from '@prisma/client';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    // createUserDto.id = randomUUID();
    createUserDto.password = hashedPassword;
    createUserDto.createdAt = new Date();
    createUserDto.updatedAt = new Date();

    var obj = await this.prisma.user.findUnique({ where: {  email: createUserDto.email, deleted: true }});

    if (obj) {

        var {
            email, active, deleted, id, name, updatedAt, password, profileId, companyId, resetPasswordNextLogin
        } = obj;

        deleted = false;
        active = createUserDto.active;
        id = createUserDto.id; //add 
        name = createUserDto.name;
        password = createUserDto.password;
        profileId = createUserDto.profileId;
        companyId = createUserDto.companyId;
        resetPasswordNextLogin = createUserDto.resetPasswordNextLogin;

        var changePassword = true;

        return this.update(id, {email, active, deleted, name, updatedAt, changePassword, password, profileId, companyId, resetPasswordNextLogin});
    }
    else{
        return this.prisma.user.create({ data: createUserDto });
    }
  }

  findAll(page: number = 1, perPage: number = 5, filter: string = "") {
    // return this.prisma.user.findMany({
    //     include: {
    //       company: true, // Return all fields
    //       profile: true
    //     },
    // });


    const paginate = createPaginator({ perPage });

        if (filter != "") {
            return paginate<UserEntity, Prisma.UserFindManyArgs>(
                this.prisma.user,
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
                  include: {
                    company: true, // Return all fields
                    profile: true
                },
                  orderBy: {
                    name: 'asc',
                  },
                },
                {
                  page,
                },
              );

        }
        else{
            return paginate<UserEntity, Prisma.UserFindManyArgs>(
                this.prisma.user,
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
                    company: true, // Return all fields
                    profile: true
                },
                  orderBy: {
                    name: 'asc',
                  },
                },
                {
                  page,
                },
            );
        }
  }

  findAllByCompany(page: number = 1, perPage: number = 5, filter: string = "", idCompany: number ) {
    const paginate = createPaginator({ perPage });

    if (filter != "") {
        return paginate<UserEntity, Prisma.UserFindManyArgs>(
            this.prisma.user,
            {
                where: {
                companyId: idCompany,
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
                ] },
                include: {
                company: true, // Return all fields
                profile: true
            },
                orderBy: {
                name: 'asc',
                },
            },
            {
                page,
            },
        );
    }
    else{
        return paginate<UserEntity, Prisma.UserFindManyArgs>(
            this.prisma.user,
            {
            where: {
                companyId: idCompany,
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
                company: true, // Return all fields
                profile: true
            },
                orderBy: {
                name: 'asc',
                },
            },
            {
                page,
            },
        );
    }
  }

  findOne(id: string) {
    try {
        return this.prisma.user.findUnique({ where: { id }, include: {
            profile: true
        }});
    } catch (e) {
        throw new BadRequestException(e)
    }        
}

  async findOneWithRelations(id: string) {
    try {
        var user = await this.prisma.user.findUnique({ where: { id }, include: {
            profile: true
          } });
    
        var profileAccess = await this.prisma.profileAccess.findMany({ where: { profileId: user.profileId }, include: {
            menu: true
        } });
    
        return {
            user: user,
            profileAccess: profileAccess
        }
    } catch (e) {
        throw new BadRequestException(e)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
        updateUserDto.updatedAt = new Date();

        if (updateUserDto.changePassword) {

            const hashedPassword = await bcrypt.hash(
                updateUserDto.password,
                roundsOfHashing,
            );

            updateUserDto.password = hashedPassword;

            var {active, companyId, email, name, password, profileId, updatedAt, resetPasswordNextLogin, deleted } = updateUserDto;

            return this.prisma.user.update({ where: { id }, data: {deleted, active, password, resetPasswordNextLogin, companyId, email, name, profileId, updatedAt } });
        }
        else{
            var {active, companyId, email, name, profileId, updatedAt, resetPasswordNextLogin } = updateUserDto;
            return this.prisma.user.update({ where: { id }, data: {active, companyId, email, name, profileId, updatedAt, resetPasswordNextLogin } });
        }
    } catch (e) {
        throw new BadRequestException(e)
    }     
    

  }

  async updatePass(id: string, updateUserDto: UpdateUserDto) {
    try {
        updateUserDto.updatedAt = new Date();

        const hashedPassword = await bcrypt.hash(
            updateUserDto.password,
            roundsOfHashing,
        );

        updateUserDto.password = hashedPassword;

        var { password, resetPasswordNextLogin, updatedAt } = updateUserDto;

        return this.prisma.user.update({ where: { id }, data: { updatedAt, resetPasswordNextLogin, password } });
    } catch (e) {
        throw new BadRequestException(e)
    }     
  }

  async remove(id: string) {
    try {
        // return this.prisma.user.delete({ where: { id } });
        var obj = await this.findOne(id);

        var {active, updatedAt, deleted} = obj;

        active = false;
        deleted = true;

        return await this.prisma.user.update(
            {
            where: { id },
            data: {
                active, updatedAt, deleted
                }
            }
        );
    } catch (e) {
        throw new BadRequestException(e)
    }     
        
  }

}
