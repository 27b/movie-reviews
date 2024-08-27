import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  providers: [AuthService, JwtService, UsersService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
