import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserWithEmailAndPasswordsDTO, UserDTO } from './users.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}

    async register(user: RegisterUserWithEmailAndPasswordsDTO): Promise<any> {
        let query = { where: { email: user.email }};
        let userInDb = await this.usersRepository.findOne(query);

        if (userInDb) return { message: "Email already in use" };

        if (user.password1 !== user.password2) return { message: "Passwords not equal" };

        let userDTO = {
            username: user.username,
            email: user.email,
            password: user.password1,
        }

        let newUser = this.usersRepository.create(userDTO);

        return await this.usersRepository.save(newUser);
    }

    async getAll(): Promise<Record<string, UserDTO[]>> {
        let users = await this.usersRepository.find();
        let clenedList = users.map(user => plainToClass(UserDTO, user));
        return { users: clenedList };
    }

    async findById(id: number): Promise<UserDTO> {
        let query = { where: { id }};
        let user = await this.usersRepository.findOne(query);
        return plainToClass(UserDTO, user);
    }

}
