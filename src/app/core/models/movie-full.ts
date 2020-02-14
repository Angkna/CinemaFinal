export class MovieFull {
    public idMovie: number;
    public title: string;
    public year: number;
    public duration: number;
	public genres: string[];
	public rating: number; 
	public synopsis: string;
	public audiance: string;

    public deserialize(datas: any): MovieFull {
        Object.assign(this, datas);
        return this;
    }
}
