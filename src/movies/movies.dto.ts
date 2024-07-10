import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDTO {
    @IsEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class UpdateMovieDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class DeleteMovieDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}