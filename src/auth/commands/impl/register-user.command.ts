import { RegisterUserWithEmailAndPasswordsDTO } from "src/users/users.dto";

export class RegisterUserCommand {
  constructor(
    public readonly user: RegisterUserWithEmailAndPasswordsDTO,
  ) {}
}
