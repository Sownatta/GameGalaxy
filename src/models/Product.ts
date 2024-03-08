import { ProductIn, ProductOut } from "./ProductTypes";

export class Product{
    constructor(public id:number, public name:string, public stock:number, public categoryId:number, public price:number, public description:string, public imgUrl:string, public userId:number){
        
        Object.assign(this, {id, name, stock, categoryId, price, description, imgUrl, userId})
    }
    toObject(): ProductOut {
        return { id: this.id, name: this.name, stock: this.stock, categoryId: this.categoryId, price: this.price, description: this.description, imgUrl: this.imgUrl, userId: this.userId };
    }

}

export class ProductInsert{
    constructor(public name:string, public stock:number, public categoryId:number, public price:number, public description:string, public imgUrl:string, public userId:number){

        Object.assign(this, {name, stock, categoryId, price, description, imgUrl, userId})
    }
    toObject(): ProductIn {
        return { name: this.name, stock: this.stock, categoryId: this.categoryId, price: this.price, description: this.description, imgUrl: this.imgUrl, userId: this.userId };
    }

}