import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuthDocument } from 'src/common/decorator/swagger/auth.document.decorator';
import { AuthService } from './auth.service';
import { API_DOC_TYPE } from './constant';
import { DocumentHelper } from './decorator';
import {
  AccessTokenResponseDTO,
  LoginRequestDTO,
  SignupRequestDTO,
} from './dto';
import { JwtGuard } from './guard';
import { SignupPipe } from './pipe';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @DocumentHelper(API_DOC_TYPE.SIGNUP)
  @Post('signup')
  @HttpCode(201)
  async signup(
    @Body(SignupPipe) newUser: SignupRequestDTO,
  ): Promise<AccessTokenResponseDTO> {
    return this.authService.signup(newUser);
  }

  @DocumentHelper(API_DOC_TYPE.LOGIN)
  @Post('login')
  @HttpCode(201)
  async login(@Body() login: LoginRequestDTO): Promise<AccessTokenResponseDTO> {
    return this.authService.login(login);
  }

  @ApiAuthDocument()
  @DocumentHelper(API_DOC_TYPE.ME)
  @UseGuards(JwtGuard)
  @Get('me')
  @HttpCode(204)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  me(): void {}
}
