// src/users/entities/user.entity.ts
import { CreateCompanyDto } from '@/company/dto/create-company.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
    deleted: boolean;
    resetPasswordNextLogin: boolean;
    codeChangePassword: string;
    dateRequestChangePassword: Date;

    id: string;
    createdAt: Date;
    updatedAt: Date;

    @ApiProperty()
    name: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    profileId: number;

    @ApiProperty()
    companyId: number;

}
