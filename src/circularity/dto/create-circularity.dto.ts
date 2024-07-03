import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";
import { IsBoolean, IsDecimal, IsNumber, IsString } from "class-validator";

export class CreateCircularityDto {
    id: number;

    @ApiProperty()
    numberRecord: string;

    @IsBoolean()
    @ApiProperty()
    sendEquipment: boolean;

    @IsString()
    @ApiProperty()
    serial: string;

    @IsNumber()
    @ApiProperty()
    productId: number;

    @IsNumber()
    @ApiProperty()
    generalConditionId: number;


    originId: number;

    @IsNumber()
    @ApiProperty()
    totalCountPrintPages: number;

    @IsNumber()
    @ApiProperty()
    currentSupplylevel: Decimal;

    @IsNumber()
    @ApiProperty()
    currentInkLevel: Decimal;

    @IsNumber()
    @ApiProperty()
    currentMaintenanceKitLevel: Decimal;

    @IsBoolean()
    @ApiProperty()
    printerCleaning: boolean;

    @IsBoolean()
    @ApiProperty()
    replacementRepair: boolean;

    @IsString()
    @ApiProperty()
    commentReplacementRepair: string;


    destinationId: number;

    @IsString()
    @ApiProperty()
    additionalNote: string;

    @IsNumber()
    @ApiProperty()
    circulatityStatusId: number;

    @IsString()
    @ApiProperty()
    userCreatedId: string;

    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
