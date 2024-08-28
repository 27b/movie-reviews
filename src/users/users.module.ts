import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserByIdHandler } from './queries/handlers/get-user-by-id.handler';
import { GetUserListHandler } from './queries/handlers/get-user-list.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UsersController],
  providers: [
    AuthService,
    JwtService,
    UsersService,
    GetUserByIdHandler,
    GetUserListHandler
  ],
})
export class UsersModule {}
