import { Body, Controller, Post } from '@nestjs/common';
import {
  RegisterUserWithEmailAndPasswordsDTO,
  SignInUserWithEmailAndPasswordDTO,
} from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/login')
  login(@Body() user: SignInUserWithEmailAndPasswordDTO) {
    return this.authService.validateUser(user);
  }

  @Post('/register')
  async register(@Body() user: RegisterUserWithEmailAndPasswordsDTO) {
    return await this.usersService.register(user);
  }
}
