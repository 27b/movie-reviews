import { Strategy } from 'passport-local';

import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { SignInUserWithEmailAndPasswordDTO } from 'src/users/users.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        const dto = new SignInUserWithEmailAndPasswordDTO();

        dto.email = email;
        dto.password = password;

        const user = await this.authService.validateUser(dto);

        if (!user) throw new UnauthorizedException();

        return user;
    }
}