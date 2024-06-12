import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateProfileDto {

    id: number;
    createdAt: Date;
    updatedAt: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsBoolean()
    active: boolean;

    @ApiProperty()
    @IsBoolean()
    allowAdd: boolean;

    @ApiProperty()
    @IsBoolean()
    allowSave: boolean;

    @ApiProperty()
    @IsBoolean()
    allowEdit: boolean;

    @ApiProperty()
    @IsBoolean()
    allowDelete: boolean;

    @ApiProperty()
    @IsBoolean()
    allowView: boolean;

    @ApiProperty()
    @IsArray()
    arrayMenu?: Array<number>;
}
