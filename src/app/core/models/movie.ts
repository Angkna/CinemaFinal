export class Movie {
    public idMovie: number;
    public title: string;
    public year: number;
    public nbLike: number = 0;
    public animationState: String= "base";

    public deserialize(datas: any): Movie {
        Object.assign(this, datas);
        return this;
    }
}
