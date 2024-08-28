import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { GetMovieByIdHandler } from './queries/handlers/get-movie-by-id.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetMovieListHandler } from './queries/handlers/get-movie-list.handler';
import { CreateMovieHandler } from './commands/handlers/create-movie.handler';
import { UpdateMovieHandler } from './commands/handlers/update-movie.handler';
import { DeleteMovieHandler } from './commands/handlers/delete-movie.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, User]), CqrsModule],
  controllers: [MoviesController],
  providers: [
    AuthService,
    JwtService,
    MoviesService,
    GetMovieByIdHandler,
    GetMovieListHandler,
    CreateMovieHandler,
    UpdateMovieHandler,
    DeleteMovieHandler
  ],
})
export class MoviesModule {}
