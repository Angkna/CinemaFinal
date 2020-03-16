import { UserInterface } from './user-interface';
import { Movie } from './movie';

export class User implements UserInterface {
  firstName: string;
  lastName: string;
  idUser?: number;
  userName: string;
  password: string;
  token?: string;
  isAuthenticated?: boolean;
  movieLiked?: Movie[];
  email?: string;
  role?: string;

  public deserialize(datas: any): User {
    Object.assign(this, datas);
    return this;
}
}
