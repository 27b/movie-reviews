import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInUserWithEmailAndPasswordDTO } from 'src/users/users.dto';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONFIG } from './strategies/jwt/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user: SignInUserWithEmailAndPasswordDTO): Promise<any> {
    const query = { where: { email: user.email } };

    const userInDb = await this.usersRepository.findOne(query);

    if (!userInDb) throw new UnauthorizedException();

    if (user.password != userInDb.password) return null;

    let data = { id: userInDb.id };

    let jwt = this.jwtService.sign(data, JWT_CONFIG);
    
    return { token: jwt };
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, JWT_CONFIG);
  }
}
