import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserWithEmailAndPasswordsDTO, SignInUserWithEmailAndPasswordDTO, UserDTO } from './users.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @Post('/signin')
    signin(@Body() user: SignInUserWithEmailAndPasswordDTO): any {
        return this.authService.getToken(user);
    }

    @Post('/register')
    register(@Body() user: RegisterUserWithEmailAndPasswordsDTO): any {
        return this.usersService.register(user);
    }

    @Get()
    @UseGuards(AuthGuard)
    list(): Promise<Record<string, UserDTO[]>> {
        return this.usersService.getAll();
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    findById(@Param("id") id: number): Promise<UserDTO> {
        return this.usersService.findById(id);
    }
}
