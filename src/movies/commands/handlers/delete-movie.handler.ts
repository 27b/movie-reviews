import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MoviesService } from 'src/movies/movies.service';
import { DeleteMovieCommand } from '../impl/delete-movie.command';

@CommandHandler(DeleteMovieCommand)
export class DeleteMovieHandler implements ICommandHandler<DeleteMovieCommand> {
  constructor(private readonly moviesService: MoviesService) {}

  async execute(command: DeleteMovieCommand) {
    const { userId, movie } = command;
    return this.moviesService.deleteMovie(userId, movie);
  }
}
