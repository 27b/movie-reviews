import { CreateMovieDTO } from 'src/movies/movies.dto';

export class CreateMovieCommand {
  constructor(
    public readonly userId: number,
    public readonly movie: CreateMovieDTO,
  ) {}
}
