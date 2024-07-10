import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard as PassportGuard } from '@nestjs/passport';
import { RegisterUserWithEmailAndPasswordsDTO } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly usersService: UsersService) {}

    @Post("/login")
    @UseGuards(PassportGuard('local'))
    async login(@Request() req) {
        return req.user;
    }

    @Post('/register')
    register(@Body() user: RegisterUserWithEmailAndPasswordsDTO): any {
        return this.usersService.register(user);
    }
}
