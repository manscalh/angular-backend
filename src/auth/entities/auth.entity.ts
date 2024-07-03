import { UserResponseDTO } from '@/users/dto/response-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: UserResponseDTO;

  @ApiProperty()
  profileAccess: any;
}
