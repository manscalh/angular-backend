import { ApiProperty } from "@nestjs/swagger"

export class UserEntityAD {

    @ApiProperty()
    status: string;

    @ApiProperty()
    id: string;

    @ApiProperty()
    nome: string;
    
    @ApiProperty()
    sobrenome: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    displayname: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    department: string;
}




