import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { API_DOC_TYPE } from './constant';
import { DocumentHelper } from './decorator';
import {
  AccessTokenResponseDTO,
  LoginRequestDTO,
  SignupRequestDTO,
} from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @DocumentHelper(API_DOC_TYPE.SIGNUP)
  @Post('signup')
  async signup(
    @Body() newUser: SignupRequestDTO,
  ): Promise<AccessTokenResponseDTO> {
    return this.authService.signup(newUser);
  }

  @DocumentHelper(API_DOC_TYPE.LOGIN)
  @Post('login')
  async login(@Body() login: LoginRequestDTO) {
    return this.authService.login(login);
  }
}
