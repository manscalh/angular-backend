import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, MinLength, isBoolean } from "class-validator";

export class CreateCompanyDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    CNPJ: string;

    // @IsNotEmpty()
    @ApiProperty()
    @IsBoolean()
    active: boolean;
}
