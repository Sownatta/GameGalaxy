import { CategoryIn, CategoryOut } from "./CategoryTypes";

export class Category{
    constructor(public id:number, public name:string){
        
        Object.assign(this, {id, name})
    }
    toObject(): CategoryOut {
        return { id: this.id, name: this.name };
    }

}

export class CategoryInsert{
    constructor(public name:string){

        Object.assign(this, {name})
    }
    toObject(): CategoryIn {
        return { name: this.name };
    }

}