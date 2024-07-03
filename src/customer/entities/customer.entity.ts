import { ApiProperty } from "@nestjs/swagger";
import { Tb_SSD_FrontEnd_Customer_X_Partnumber } from "@prisma/client";

export class CustomerEntity implements Tb_SSD_FrontEnd_Customer_X_Partnumber {
    
    id: number;
    createdAt: Date;    

    @ApiProperty()
    customer: string;

    @ApiProperty()
    partnumber: string;

   
}
