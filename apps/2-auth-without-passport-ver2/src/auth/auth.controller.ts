import { ApiControllerDocument } from '@lib/common';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { API_DOC_TYPE } from './constant/document.constant';
import { DocumentHelper } from './decorator/document.decorator';
import { SingupRequestDto } from './dto/request/signup-request.dto';

@ApiControllerDocument('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @DocumentHelper(API_DOC_TYPE.SIGNUP)
  @HttpCode(201)
  @Post('/singup')
  signup(@Body() user: SingupRequestDto) {
    return this.authService.signup();
  }

  @DocumentHelper(API_DOC_TYPE.LOGIN)
  @HttpCode(201)
  @Post('/login')
  login() {
    return this.authService.login();
  }

  @DocumentHelper(API_DOC_TYPE.ME)
  @Get('/me')
  me() {
    return this.authService.me();
  }

  @DocumentHelper(API_DOC_TYPE.REFRESH)
  @Get('/refresh')
  refresh() {
    return this.authService.refresh();
  }

  @DocumentHelper(API_DOC_TYPE.LOGOUT)
  @Get('/logout')
  logout() {
    return this.authService.logout();
  }
}
