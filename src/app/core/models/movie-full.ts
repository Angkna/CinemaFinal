import { Movie } from './movie';
import { Person } from './person';

export class MovieFull extends Movie {
    public duration: number;
	public genres?: string[];
	public rating?: number;
	public synopsis?: string;
    public audiance?: string;
    public actors?: Person[];    

    public deserialize(datas: any): MovieFull {
        Object.assign(this, datas);
        return this;
    }
}
