import { Request, Response } from 'express';
import UserService from '../services/user-service';
import { UserIn, UserOut } from "../models/UserTypes";
import { User as UserOutput, UserInsert } from "../models/User";

export class UserController {

    static async formUser(req: Request, res: Response) {
        res.render('layout', { body: '../views/formUser.ejs' });
    };

    static async getAllUsers(req: Request, res: Response) {
        
        const queryRequest: {} = await req.query;
        let UserList;

        if(Object.keys(queryRequest).length === 0) {

            UserList = await UserService.selectAll();

            console.log(UserList);

            res.render('layout', { body: '../views/userList.ejs', UserList });
        }else {
            UserList = await UserService.selectWithFilters(queryRequest);
            console.log(UserList);

            res.render('layout', { body: '../views/userList.ejs', UserList });
        }
    };

    static async getUserById(req: Request, res: Response) {
        
        const userId = req.params.id;

        const listId = await UserService.selectUserById(Number(userId));

        res.json(listId).status(200);    
    };

    static async createUser(req: Request, res: Response) {
        
        const newUser = new UserInsert(req.body.name, req.body.cpf, req.body.birthday, req.body.email, req.body.password)   
    
        
       const create = await UserService.createUser(newUser.toObject());

        res.send('Usuário criado com sucesso.').status(201);
    };

    static async updateUser(req: Request, res: Response) {
        
        const userId = await req.params.id;

        const newUser = new UserInsert(req.body.name, req.body.cpf, req.body.birthday, req.body.email, req.body.password) 

        UserService.updateItem(Number(userId), newUser.toObject())
        res.send('Usuário atualizado com sucesso.').status(204);
    };

    static async deleteUser(req: Request, res: Response){
        const userId = await req.params.id;

        UserService.deleteUser(Number(userId))
        res.send('Usuário deletado com sucesso.').status(204);
    };
}

export default UserController