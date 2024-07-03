import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateBrandDto {
    id: number;

    @IsString()
    @ApiProperty()
    description: string;

    @IsBoolean()
    @ApiProperty()
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
