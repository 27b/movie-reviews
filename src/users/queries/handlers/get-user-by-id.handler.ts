import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../impl/get-user-by-id.query';
import { UsersService } from 'src/users/users.service';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly usersService: UsersService) {}

  async execute(query: GetUserByIdQuery): Promise<any> {
    const { id } = query;
    return this.usersService.findById(id);
  }
}
