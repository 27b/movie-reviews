import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './queries/impl/get-user-by-id.query';
import { GetUserListQuery } from './queries/impl/get-user-list.query';

@Controller('users')
export class UsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @UseGuards(AuthGuard)
  list(): Promise<Record<string, UserDTO[]>> {
    return this.queryBus.execute(new GetUserListQuery());
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: number): Promise<UserDTO> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }
}
