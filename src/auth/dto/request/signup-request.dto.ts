import { ApiProperty } from '@nestjs/swagger';

export class SignupRequestDTO {
  @ApiProperty({
    description: 'User ID',
  })
  username: string;

  @ApiProperty({
    description: 'User Password',
    minimum: 12,
  })
  password: string;

  @ApiProperty({
    description: 'User Confirmation Password',
    minLength: 12,
  })
  confirmationPassword: string;

  @ApiProperty({
    description: 'User First Name',
  })
  firstName: string;

  @ApiProperty({
    description: 'User Last Name',
  })
  lastName: string;
}
