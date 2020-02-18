export class Movie {
    public idMovie: number;
    public title: string;
    public year: number;
    public nbLike: number;

    public deserialize(datas: any): Movie {
        Object.assign(this, datas);
        this.nbLike = 0;
        return this;
    }
}
