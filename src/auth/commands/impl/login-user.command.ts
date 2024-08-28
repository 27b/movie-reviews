import { SignInUserWithEmailAndPasswordDTO } from "src/users/users.dto";

export class LoginUserCommand {
  constructor(
    public readonly user: SignInUserWithEmailAndPasswordDTO,
  ) {}
}
