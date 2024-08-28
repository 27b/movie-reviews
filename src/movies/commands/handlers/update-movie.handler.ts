import { MoviesService } from 'src/movies/movies.service';
import { UpdateMovieCommand } from '../impl/update-movie.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateMovieCommand)
export class UpdateMovieHandler implements ICommandHandler<UpdateMovieCommand> {
  constructor(private readonly moviesService: MoviesService) {}

  async execute(command: UpdateMovieCommand) {
    const { userId, movie } = command;
    return this.moviesService.updateMovie(userId, movie);
  }
}
