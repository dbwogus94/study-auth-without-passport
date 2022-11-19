import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { API_DOC_TYPE } from './constant';
import { DocumentHelper } from './decorator';
import { AccessTokenResponseDTO, SignupRequestDTO } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @DocumentHelper(API_DOC_TYPE.SIGNUP)
  @Post('signup')
  async signup(
    @Body() newUser: SignupRequestDTO,
  ): Promise<AccessTokenResponseDTO> {
    const foundUser = this.authService.findUser(newUser.username);
    if (foundUser) {
      throw new ConflictException(
        `User with username ${newUser.username} already exists`,
      );
    }
    return this.authService.signup(newUser);
  }
}
