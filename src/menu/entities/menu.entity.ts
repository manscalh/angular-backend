import { ApiProperty } from "@nestjs/swagger";
import { Menu, Profile } from "@prisma/client";
export class MenuEntity implements Menu {
    order: number;
    deleted: boolean;
    id: number;
    createdAt: Date;
    updatedAt: Date;

    @ApiProperty()
    description: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    showSideBar: boolean;

    @ApiProperty()
    showHome: boolean;

    @ApiProperty()
    isClick: boolean;

    @ApiProperty()
    image: string;

    @ApiProperty()
    image_active: string;

    @ApiProperty()
    idDad: number;
}
