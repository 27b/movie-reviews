import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get()
    @UseGuards(AuthGuard)
    list(): Promise<Record<string, UserDTO[]>> {
        return this.usersService.getAll();
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    findById(@Param("id") id: number): Promise<UserDTO> {
        return this.usersService.findById(id);
    }
}
