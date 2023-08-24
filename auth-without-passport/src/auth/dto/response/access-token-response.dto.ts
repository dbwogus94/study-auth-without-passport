import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponseDTO {
  @ApiProperty({
    description: 'Access Token',
  })
  accessToken: string;
}
