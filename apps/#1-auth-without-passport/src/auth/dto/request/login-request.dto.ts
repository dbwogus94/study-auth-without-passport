import { PickType } from '@nestjs/swagger';
import { SignupRequestDTO } from './signup-request.dto';

export class LoginRequestDTO extends PickType(SignupRequestDTO, [
  'username',
  'password',
]) {}
