import { ApiProperty } from "@nestjs/swagger";
import { Prisma, Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class ProductEntity implements Product {

    deleted: boolean;
    id: number;
    createdAt: Date;
    updatedAt: Date;

    @ApiProperty()
    description: string;

    @ApiProperty()
    SKU: string;

    @ApiProperty()
    family: string;

    @ApiProperty()
    weight: Decimal;

    @ApiProperty()
    brandId: number;

    weightString: string;

    @ApiProperty()
    statusProduct: boolean;

}
