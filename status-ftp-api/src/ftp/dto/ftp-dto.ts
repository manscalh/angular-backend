/* eslint-disable prettier/prettier */
import { IsDecimal, IsString} from "class-validator";

export class FtpDTO{

    @IsString()
    name: string;

    @IsDecimal()
    size: number;

    @IsString()
    buffer?: string;

    @IsString()
    directory?: string;

    constructor(ftp: FtpDTO) {
        this.name = ftp.name;
        this.size = ftp.size;
        this.directory = ftp.directory;
    }

}