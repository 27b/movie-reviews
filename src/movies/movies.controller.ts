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
import { CreateMovieDTO, DeleteMovieDTO, UpdateMovieDTO } from './movies.dto';
import { Movie } from './movie.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMovieByIdQuery } from './queries/impl/get-movie-by-id.query';
import { GetMovieListQuery } from './queries/impl/get-movie-list.query';
import { CreateMovieCommand } from './commands/impl/create-movie.command';
import { UpdateMovieCommand } from './commands/impl/update-movie.command';
import { DeleteMovieCommand } from './commands/impl/delete-movie.command';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  listMovie(): Promise<Record<string, Movie[]>> {
    return this.queryBus.execute(new GetMovieListQuery());
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number): Promise<Movie> {
    return this.queryBus.execute(new GetMovieByIdQuery(id));
  }

  @Post()
  @UseGuards(AuthGuard)
  createMovie(@Request() req, @Body() movie: CreateMovieDTO): Promise<Movie> {
    return this.commandBus.execute(new CreateMovieCommand(req.user.id, movie));
  }

  @Put()
  @UseGuards(AuthGuard)
  updateMovie(@Request() req, @Body() movie: UpdateMovieDTO): Promise<Movie> {
    return this.commandBus.execute(new UpdateMovieCommand(req.user.id, movie));
  }

  @Delete()
  @UseGuards(AuthGuard)
  deleteMovie(@Request() req, @Body() movie: DeleteMovieDTO): Promise<any> {
    return this.commandBus.execute(new DeleteMovieCommand(req.user.id, movie));
  }
}
