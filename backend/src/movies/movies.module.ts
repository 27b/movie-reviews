import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movie, User])],
    controllers: [MoviesController],
    providers: [AuthService, MoviesService]
})
export class MoviesModule {}
