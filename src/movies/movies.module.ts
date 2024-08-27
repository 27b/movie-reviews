import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, User])],
  controllers: [MoviesController],
  providers: [AuthService, JwtService, MoviesService],
})
export class MoviesModule {}
