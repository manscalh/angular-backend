import { UserResponseDTO } from "@/users/dto/response-user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class MenuDTO{

    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    image: string

    @ApiProperty()
    image_active: string

    @ApiProperty()
    url: string

    @ApiProperty()
    isClick: boolean

    @ApiProperty()
    idDad?: number

    @ApiProperty()
    active: boolean

    @ApiProperty()
    showSideBar:boolean

    @ApiProperty()
    showHome:boolean

    @ApiProperty()
    check?:boolean

    @ApiProperty()
    subitens?: MenuDTO[]

    @ApiProperty()
    classActive?: string;
}

export class MenuItemDTO{
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    image: string

    @ApiProperty()
    image_active: string

    @ApiProperty()
    url: string

    @ApiProperty()
    isClick: boolean

    @ApiProperty()
    idDad?: number

    @ApiProperty()
    active: boolean

    @ApiProperty()
    showSideBar:boolean

    @ApiProperty()
    showHome:boolean

    @ApiProperty()
    check?:boolean

    // @ApiProperty()
    // subitens: MenuItemDTO[]
}

export class AuthResponseDTO {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    user: UserResponseDTO;

    @ApiProperty()
    menu: MenuDTO[];

    @ApiProperty()
    menuHome: MenuItemDTO[];
}
