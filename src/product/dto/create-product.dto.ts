import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsBoolean, IsDecimal, IsNotEmpty, IsString, MinLength, isBoolean } from "class-validator";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateProductDto {

    id: number;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    SKU: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    family: string;

    @IsNotEmpty()
    @ApiProperty()
    weight: Decimal;

    @ApiProperty()
    @IsNotEmpty()
    brandId: number;

    @ApiProperty()
    weightString: string;

    @ApiProperty()
    @IsBoolean()
    statusProduct: boolean;
}
