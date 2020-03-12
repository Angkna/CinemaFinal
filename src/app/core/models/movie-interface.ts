import { Movie } from './movie';

export class MovieInterface {
idMovie: number;
title: string;
year: string;

 duration?: number;
	 genres?: string[];
	 rating?: number;
	 synopsis?: string;
	 audiance?: string;


     nbLike?: number ;
     animationState?: String;

    //  type = 'Movie';

    constructor(){}

    public deserialize(datas: any): MovieInterface {
        Object.assign(this, datas);
        return this;
    }
}


