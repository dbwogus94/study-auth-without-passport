import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CustomRequest,
  JwtPayload,
} from '../interface/custom-request.interface';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest<CustomRequest>(context);
    try {
      const token = this.getToken(request);
      const user: JwtPayload = this.jwtService.verify(token);
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getToken(request: CustomRequest): string {
    const authorization = request.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new Error('Invalid Authorization Header');
    }
    if (!authorization.startsWith('Bearer')) {
      throw new Error('Invalid Authorization Header');
    }
    const [, token] = authorization.split(' ');
    return token;
  }
}
