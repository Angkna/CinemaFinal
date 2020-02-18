import { Movie } from './movie';

export interface UserInterface {
    userName: string;
    password: string;
    token?: string;
    isAuthenticated: boolean;
    likedMovie?: Set<Movie>;
}
