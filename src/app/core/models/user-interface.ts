import { Movie } from './movie';

export interface UserInterface {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  token?: string;
  isAuthenticated?: boolean;
  movieLiked?: Set<Movie>;
  email?: string;
  role?: string;

}
