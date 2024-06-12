import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "@prisma/client";

export class ProfileEntity implements Profile {

    deleted: boolean;
    id: number;
    createdAt: Date;
    updatedAt: Date;

    @ApiProperty()
    name: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    allowAdd: boolean;

    @ApiProperty()
    allowSave: boolean;

    @ApiProperty()
    allowEdit: boolean;

    @ApiProperty()
    allowDelete: boolean;

    @ApiProperty()
    allowView: boolean;
}
