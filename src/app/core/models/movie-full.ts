import { Movie } from './movie';

export class MovieFull extends Movie {
    public duration: number;
	public genres?: string[];
	public rating?: number;
	public synopsis?: string;
    public audiance?: string;
    

    public deserialize(datas: any): MovieFull {
        Object.assign(this, datas);
        this.nbLike = 0;
        return this;
    }
}
