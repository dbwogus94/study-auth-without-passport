import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AccessTokenResponseDTO, SignupRequestDTO } from './dto';

interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  findUser(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }

  async signup(newUser: SignupRequestDTO): Promise<AccessTokenResponseDTO> {
    const user = await this.createUser(newUser);
    return this.createAccessToken(user.username);
  }

  private createAccessToken(username: string): AccessTokenResponseDTO {
    return { accessToken: this.jwtService.sign({ sub: username }) };
  }

  private async createUser(newUser: SignupRequestDTO): Promise<User> {
    const user = {
      password: await argon2.hash(newUser.password),
      ...newUser,
    };
    this.users.push(user);
    return user;
  }
}
