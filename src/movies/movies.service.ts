import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDTO, DeleteMovieDTO, UpdateMovieDTO } from './movies.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async createMovie(userId: number, movie: CreateMovieDTO): Promise<Movie> {
    movie.userId = userId;
    const movieToStore = this.movieRepository.create(movie);
    return await this.movieRepository.save(movieToStore);
  }

  async updateMovie(userId: number, movie: UpdateMovieDTO) {
    const storedMovie = await this.findById(movie.id);

    if (userId != storedMovie.userId) return null;

    return await this.movieRepository.save(movie);
  }

  async deleteMovie(userId: number, movie: DeleteMovieDTO) {
    const storedMovie = await this.findById(movie.id);

    if (userId != storedMovie.userId) return null;

    return await this.movieRepository.delete(movie.id);
  }

  async listMovies(): Promise<Record<string, Movie[]>> {
    return { movies: await this.movieRepository.find() };
  }

  async findById(id: number): Promise<Movie> {
    return await this.movieRepository.findOne({ where: { id } });
  }
}
