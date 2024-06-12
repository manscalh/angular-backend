import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, MinLength, isNumber } from "class-validator";

export class CreateMenuDto {

    createdAt: Date;
    updatedAt: Date;

    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    description: string;

    @IsString()
    @ApiProperty()
    url: string;

    @IsBoolean()
    @ApiProperty()
    active: boolean;

    @IsBoolean()
    @ApiProperty()
    showSideBar: boolean;

    @IsBoolean()
    @ApiProperty()
    showHome: boolean;

    @IsBoolean()
    @ApiProperty()
    isClick: boolean;

    @IsString()
    @ApiProperty()
    image: string;

    @IsString()
    @ApiProperty()
    image_active: string;

    @IsNumber()
    @ApiProperty()
    idDad?: number;

    @IsNumber()
    @ApiProperty()
    order: number;

    @ApiProperty()
    deleted: boolean;
}
