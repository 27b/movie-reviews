import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDTO, DeleteMovieDTO, UpdateMovieDTO } from './movies.dto';
import { Movie } from './movie.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @UseGuards(AuthGuard)
  listMovie(): Promise<Record<string, Movie[]>> {
    return this.moviesService.listMovies();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createMovie(@Request() req, @Body() movie: CreateMovieDTO): Promise<Movie> {
    return this.moviesService.createMovie(req.user, movie);
  }

  @Put()
  @UseGuards(AuthGuard)
  updateMovie(@Request() req, @Body() movie: UpdateMovieDTO): Promise<Movie> {
    return this.moviesService.updateMovie(req.user, movie);
  }

  @Delete()
  @UseGuards(AuthGuard)
  deleteMovie(@Request() req, @Body() movie: DeleteMovieDTO): Promise<any> {
    return this.moviesService.deleteMovie(req.user, movie);
  }
}
