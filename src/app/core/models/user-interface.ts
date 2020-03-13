import { Movie } from './movie';

export interface UserInterface {
  firstName: string;
  lastName: string;
  idUser?: number;
  userName: string;
  password: string;
  token?: string;
  isAuthenticated?: boolean;
  movieLiked?: Set<Movie>;
  email?: string;
  role?: string;

}
