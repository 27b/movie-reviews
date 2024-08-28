import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MoviesService } from 'src/movies/movies.service';
import { GetMovieListQuery } from '../impl/get-movie-list.query';

@QueryHandler(GetMovieListQuery)
export class GetMovieListHandler implements IQueryHandler<GetMovieListQuery> {
  constructor(private readonly moviesService: MoviesService) {}

  //async execute(query: GetMovieByIdQuery): Promise<any> {
  async execute(): Promise<any> {
    return this.moviesService.listMovies();
  }
}
