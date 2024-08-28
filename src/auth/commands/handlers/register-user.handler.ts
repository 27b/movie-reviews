import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../impl/register-user.command';
import { UsersService } from 'src/users/users.service';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(private readonly usersService: UsersService) {}

  async execute(command: RegisterUserCommand) {
    let { user } = command;
    return this.usersService.register(user);
  }
}
