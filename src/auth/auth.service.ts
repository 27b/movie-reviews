import { v4 as uuid4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInUserWithEmailAndPasswordDTO } from 'src/users/users.dto';


const TOKENS = {}

@Injectable()
export class AuthService {
    
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
    
    private createToken(): string {
        return uuid4();
    }
    
    private async storeToken(token: string, userId: Number): Promise<boolean> {
        TOKENS[token] = userId;  
        return TOKENS[token] == userId;
    }

    async getToken(user: SignInUserWithEmailAndPasswordDTO): Promise<any> {
        let query = { where: { email: user.email } };
        let userInDb = await this.usersRepository.findOne(query);
        let token = null;
        let message = null;
        
        if (!userInDb) message = "Invalid email or password.";

        if (user.password != userInDb.password) message = "Invalid email or password.";

        token = this.createToken();
        message = "Success";

        let status = this.storeToken(token, userInDb.id);

        if (!status) message = "Error.";

        return { token, message };
    }

    async validateToken(token: string): Promise<Number> {
        return TOKENS[token];
    }

    async validateUser(user: SignInUserWithEmailAndPasswordDTO): Promise<any> {
        let query = { where: { email: user.email } };
        
        let userInDb = await this.usersRepository.findOne(query);

        if (!userInDb) return null;

        if (user.password != userInDb.password) return null;

        // Store token in memory
        let token = this.createToken();
        this.storeToken(token, userInDb.id);

        return { id: userInDb.id, token };
    }

    async login(user: SignInUserWithEmailAndPasswordDTO) {
        let userInDb = await this.validateUser(user);

        if (!userInDb) return null;

        let token = this.createToken();

        this.storeToken(token, userInDb.id);
        
        return { token };
    }
}
