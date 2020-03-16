import { UserInterface } from './user-interface';

export class User implements UserInterface {
  firstName: string;
  lastName: string;
  idUser?: number;
  userName: string;
  password: string;
  token?: string;
  isAuthenticated?: boolean;
  movieLiked?: Set<import("./movie").Movie>;
  email?: string;
  role?: string;

  public deserialize(datas: any): User {
    Object.assign(this, datas);
    return this;
}
}
