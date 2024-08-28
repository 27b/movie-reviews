import { DeleteMovieDTO } from 'src/movies/movies.dto';

export class DeleteMovieCommand {
  constructor(
    public readonly userId: number,
    public readonly movie: DeleteMovieDTO,
  ) {}
}
