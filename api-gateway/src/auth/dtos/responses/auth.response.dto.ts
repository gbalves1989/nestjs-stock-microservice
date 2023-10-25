import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDTO {
  @ApiProperty()
  readonly accessToken: string;
}
