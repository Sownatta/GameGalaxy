import { Sequelize, FindOptions, Op } from "sequelize";
import { User } from "../infra/database";
import { UserIn, UserOut } from "../models/UserTypes";
import { User as UserOutput, UserInsert } from "../models/User";

export default class UserService {

    static async selectAll(): Promise<UserOut[]> {

        const users = await User.findAll()

        const UserList: UserOut[] = []

        users.every(user => UserList.push(new UserOutput(user.dataValues.id, user.dataValues.name, user.dataValues.cpf, user.dataValues.birthday, user.dataValues.email, user.dataValues.password).toObject()))

        return UserList;

    };

    static async selectUserById(id: number): Promise<UserOut> {
        
        const user = await User.findByPk(id);

        const userReturn = new UserOutput(user?.dataValues.id, user?.dataValues.name, user?.dataValues.cpf, user?.dataValues.birthday, user?.dataValues.email, user?.dataValues.password);

        return userReturn;

    };

    static async selectWithFilters(obj:{}): Promise<UserOut[]> {

        const filterQuery: string[] = await Object.keys(obj);
        const filterValues: string | number[] = await Object.values(obj);
        const dynamicFilters: Record<string, any> = {};
        
        filterQuery.map((key: string, index: number) => {
            dynamicFilters[key] = {[Op.like]: `%${filterValues[index]}%`}
        })

        const filter: FindOptions = {
            where: dynamicFilters,
        }

        const filtedList = await User.findAll(filter);

        const UserList:UserOut[] = [];

        filtedList.every(user => UserList.push(new UserOutput(user.dataValues.id, user.dataValues.name, user.dataValues.cpf, user.dataValues.birthday, user.dataValues.email, user.dataValues.password).toObject()));
        
        return UserList;
    };

    static async createUser(user: UserIn) {
        
        const {name, cpf, birthday, email, password} = await user;
        User.create({name: name, cpf: cpf, birthday: birthday,  email: email, password: password})

    };

    static async updateItem(id: number, user:UserIn){
        User.update({name: user.name, cpf: user.cpf, birthday: user.birthday, email: user.email, password: user.password},{
            where:{
                id:id
            }
        })
    };

    static deleteUser(id: number) {
        User.destroy({
            where:{
                id: id
            }
        })
    };

};