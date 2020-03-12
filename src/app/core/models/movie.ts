import { Data } from './data';

export class Movie extends Data {
    public idMovie: string;
    public title: string;
    public year: string;
    public nbLike?: number = 0;
    public animationState?: String= "base";
    type = 'Movie';

    public deserialize(datas: any): Movie {
        Object.assign(this, datas);
        return this;
    }
}
