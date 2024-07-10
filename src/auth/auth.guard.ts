import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext) {
        let request = context.switchToHttp().getRequest();
        
        let token = request.headers.authorization?.split(' ')[1];
        
        if (!token) throw new UnauthorizedException();

        let user = await this.authService.validateToken(token);

        if (!user) throw new UnauthorizedException();

        request.userId = user;

        return true;
    }
}