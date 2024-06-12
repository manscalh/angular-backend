import { ApiProperty } from "@nestjs/swagger";
import { Company } from "@prisma/client";

export class CompanyEntity implements Company {
    deleted: boolean;
    id: number;
    createdAt: Date;
    updatedAt: Date;

    @ApiProperty()
    name: string;

    @ApiProperty()
    CNPJ: string;

    @ApiProperty()
    active: boolean;
}
