import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import {
  AccessTokenResponseDTO,
  LoginRequestDTO,
  SignupRequestDTO,
} from './dto';
import { JwtPayload, User } from './interface';

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  findUser(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }

  async signup(newUser: SignupRequestDTO): Promise<AccessTokenResponseDTO> {
    const foundUser = this.findUser(newUser.username);
    if (foundUser) {
      throw new ConflictException(
        `User with username ${newUser.username} already exists`,
      );
    }
    const user = await this.createUser(newUser);
    return this.createAccessToken(user.username);
  }

  async login(login: LoginRequestDTO): Promise<AccessTokenResponseDTO> {
    try {
      const foundUser = this.findUser(login.username);
      if (!foundUser) {
        throw new Error();
      }
      const passwordMatch = await argon2.verify(
        foundUser.password,
        login.password,
      );
      if (!passwordMatch) {
        throw new Error();
      }
      return this.createAccessToken(login.username);
    } catch (error) {
      throw new UnauthorizedException(
        'Username or password may be incorrect. Please try again',
      );
    }
  }

  private createAccessToken(username: string): AccessTokenResponseDTO {
    const jwtPayload: JwtPayload = { sub: username };
    return { accessToken: this.jwtService.sign(jwtPayload) };
  }

  private async createUser(newUser: SignupRequestDTO): Promise<User> {
    const user = {
      ...newUser,
      password: await argon2.hash(newUser.password),
    };
    this.users.push(user);
    return user;
  }
}
