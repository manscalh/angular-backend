import { UserResponseDTO } from '@/users/dto/response-user.dto';
import { ProfileAccessEntity } from '@/users/entities/profileAccess.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: UserResponseDTO;

  @ApiProperty()
  profileAccess: any;
}
