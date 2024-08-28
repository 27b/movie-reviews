import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../impl/login-user.command';
import { AuthService } from 'src/auth/auth.service';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: LoginUserCommand) {
    let { user } = command;
    return this.authService.validateUser(user);
  }
}
