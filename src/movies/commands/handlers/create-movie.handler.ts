import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MoviesService } from 'src/movies/movies.service';
import { CreateMovieCommand } from '../impl/create-movie.command';

@CommandHandler(CreateMovieCommand)
export class CreateMovieHandler implements ICommandHandler<CreateMovieCommand> {
  constructor(private readonly moviesService: MoviesService) {}

  async execute(command: CreateMovieCommand) {
    const { userId, movie } = command;
    return this.moviesService.createMovie(userId, movie);
  }
}
