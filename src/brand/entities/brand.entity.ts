import { ApiProperty } from "@nestjs/swagger";
import { Brand } from "@prisma/client";
import { IsBoolean, IsString } from "class-validator";

export class BrandEntity implements Brand {
    id: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    deleted: boolean;

    createdAt: Date;
    updatedAt: Date;
}
