import { UpdateMovieDTO } from 'src/movies/movies.dto';

export class UpdateMovieCommand {
  constructor(
    public readonly userId: number,
    public readonly movie: UpdateMovieDTO,
  ) {}
}
