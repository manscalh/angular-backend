import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";
import { ProfileEntity } from "@/profile/entities/profile.entity";
import { CompanyEntity } from "@/company/entities/company.entity";

export class UserResponseDTO {

    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    profileId: number;

    @ApiProperty()
    companyId: number;

    @ApiProperty()
    profile: ProfileEntity;

    @ApiProperty()
    company: CompanyEntity;

    @ApiProperty()
    resetPasswordNextLogin: boolean;

    constructor(user: UserEntity, profile?: ProfileEntity, company?: CompanyEntity) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.active = user.active;
        this.profileId = user.profileId;
        this.companyId = user.companyId;
        this.profile = profile;
        this.company = company;
        this.resetPasswordNextLogin = user.resetPasswordNextLogin;
    }

}
