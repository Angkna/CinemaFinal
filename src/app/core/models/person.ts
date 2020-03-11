import { Data } from './data';

export class Person extends Data {


    public idPerson: number;
    public name: string;
    public birthdate?: number;
    public nationalities? : string;
    public biography? : string;

    
    public animationState: String= "base";
    type = 'Person';

    public deserialize(datas: any): Person {
        Object.assign(this, datas);
        return this;
    }
}
