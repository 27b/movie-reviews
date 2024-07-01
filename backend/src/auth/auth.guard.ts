import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext) {
        let request = context.switchToHttp().getRequest();

        if (!request.headers || !request.headers.authorization) return false;

        let authorization = request.headers.authorization;
        
        if (!authorization.includes("Token")) return false;

        let values = authorization.split(" ");

        if (values.length != 2) return false;

        let token = values[1];

        let result = await this.authService.validateToken(token);

        if (!result) return false;

        request.user = result;

        return true;
    }
}