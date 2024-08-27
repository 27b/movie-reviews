import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserWithEmailAndPasswordsDTO, UserDTO } from './users.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async register(user: RegisterUserWithEmailAndPasswordsDTO): Promise<any> {
    const query = { where: { email: user.email } };
    const userInDb = await this.usersRepository.findOne(query);

    if (userInDb) return { message: 'Email already in use' };

    if (user.password1 !== user.password2)
      return { message: 'Passwords not equal' };

    const userDTO = {
      username: user.username,
      email: user.email,
      password: user.password1,
    };

    const newUser = this.usersRepository.create(userDTO);

    return await this.usersRepository.save(newUser);
  }

  async getAll(): Promise<Record<string, UserDTO[]>> {
    const users = await this.usersRepository.find();
    const clenedList = users.map((user) => plainToClass(UserDTO, user));
    return { users: clenedList };
  }

  async findById(id: number): Promise<UserDTO> {
    const query = { where: { id } };
    const user = await this.usersRepository.findOne(query);
    return plainToClass(UserDTO, user);
  }
}
