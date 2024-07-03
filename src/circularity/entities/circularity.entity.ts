import { ProductEntity } from "@/product/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Circularity } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class CircularityEntity implements Circularity {
    id: number;

    @ApiProperty()
    numberRecord: string;

    @ApiProperty()
    sendEquipment: boolean;


    @ApiProperty()
    serial: string;

    @ApiProperty()
    productId: number;

    @ApiProperty()
    generalConditionId: number;

    @ApiProperty()
    originId: number;

    @ApiProperty()
    totalCountPrintPages: number;

    @ApiProperty()
    currentSupplylevel: Decimal;

    @ApiProperty()
    currentInkLevel: Decimal;

    @ApiProperty()
    currentMaintenanceKitLevel: Decimal;

    @ApiProperty()
    printerCleaning: boolean;

    @ApiProperty()
    replacementRepair: boolean;

    @ApiProperty()
    commentReplacementRepair: string;

    @ApiProperty()
    destinationId: number;

    @ApiProperty()
    additionalNote: string;

    @ApiProperty()
    circulatityStatusId: number;

    @ApiProperty()
    userCreatedId: string;

    @ApiProperty()
    deleted: boolean;

    product: ProductEntity;

    createdAt: Date;
    updatedAt: Date;
}
