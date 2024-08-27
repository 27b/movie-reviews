import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userId' })
  userId: number;

  @Column({ unique: true })
  name: string;
}
