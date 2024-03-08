import { UserIn, UserOut } from "./UserTypes";

export class User{
    constructor(public id:number, public name:string, public cpf:string, public birthday:string, public email:string, public password:string){
        
        Object.assign(this, {id, name, cpf, birthday, email, password})
    }
    toObject(): UserOut {
        return { id: this.id, name: this.name, cpf: this.cpf, birthday: this.birthday, email: this.email, password: this.password };
    }

}

export class UserInsert{
    constructor(public name:string, public cpf:string, public birthday:string, public email:string, public password:string){

        Object.assign(this, {name, cpf, birthday, email, password})
    }
    toObject(): UserIn {
        return { name: this.name, cpf: this.cpf, birthday: this.birthday, email: this.email, password: this.password };
    }

}