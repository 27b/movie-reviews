import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMovieByIdQuery } from '../impl/get-movie-by-id.query';
import { MoviesService } from 'src/movies/movies.service';

@QueryHandler(GetMovieByIdQuery)
export class GetMovieByIdHandler implements IQueryHandler<GetMovieByIdQuery> {
  constructor(private readonly moviesService: MoviesService) {}

  async execute(query: GetMovieByIdQuery): Promise<any> {
    const { id } = query;
    return this.moviesService.findById(id);
  }
}
