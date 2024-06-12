import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  profileId: number;

  @ApiProperty()
  @IsNotEmpty()
  companyId: number;

    @ApiProperty()
    @IsBoolean()
    resetPasswordNextLogin: boolean;

    @ApiProperty()
    changePassword: boolean;
}
