import { ApiProperty } from "@nestjs/swagger";
import { UserEntityAD } from "../entities/user-authAD.entity";


export class UserResponseADDTO {

    @ApiProperty()
    status: string;
   
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    constructor(user: UserEntityAD) {
        this.status = user.status;
        this.id = user.id;
        this.email = user.email;
    }
}