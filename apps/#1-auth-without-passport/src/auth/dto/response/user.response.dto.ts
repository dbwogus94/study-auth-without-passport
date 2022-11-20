import { OmitType } from '@nestjs/swagger';
import { SignupRequestDTO } from '../request';

export class UserRequestDTO extends OmitType(SignupRequestDTO, ['password']) {}
