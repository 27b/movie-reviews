import { Body, Controller, Post } from '@nestjs/common';
import {
  RegisterUserWithEmailAndPasswordsDTO,
  SignInUserWithEmailAndPasswordDTO,
} from 'src/users/users.dto';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserCommand } from './commands/impl/login-user.command';
import { RegisterUserCommand } from './commands/impl/register-user.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/login')
  login(@Body() user: SignInUserWithEmailAndPasswordDTO) {
    return this.commandBus.execute(new LoginUserCommand(user));
  }

  @Post('/register')
  async register(@Body() user: RegisterUserWithEmailAndPasswordsDTO) {
    return this.commandBus.execute(new RegisterUserCommand(user));
  }
}
