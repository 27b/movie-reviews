import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'];

    if (!token) throw new UnauthorizedException();

    try {
      const user = await this.authService.validateToken(token);

      if (!user) throw new UnauthorizedException();

      request.user = user;

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
