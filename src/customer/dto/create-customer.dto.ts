import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
    id: number;
    createdAt: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    customer: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    partnumber: string;

}
