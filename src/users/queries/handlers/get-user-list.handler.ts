import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserListQuery } from '../impl/get-user-list.query';
import { UsersService } from 'src/users/users.service';

@QueryHandler(GetUserListQuery)
export class GetUserListHandler implements IQueryHandler<GetUserListQuery> {
  constructor(private readonly usersService: UsersService) {}

  async execute(): Promise<any> {
    return this.usersService.getAll();
  }
}
