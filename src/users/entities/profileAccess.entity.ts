// src/users/entities/user.entity.ts
import { CreateCompanyDto } from '@/company/dto/create-company.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProfileAccess } from '@prisma/client';

export class ProfileAccessEntity implements ProfileAccess {

    id: number;

    @ApiProperty()
    profileId: number;

    @ApiProperty()
    menuId: number;

}
