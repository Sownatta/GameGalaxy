import { Sequelize, FindOptions, Op } from "sequelize";
import { Category } from "../infra/database";
import { CategoryIn, CategoryOut } from "../models/CategoryTypes";
import { Category as CategoryOutput, CategoryInsert } from "../models/Category";

export default class CategoryService {

    static async selectAll(): Promise<CategoryOut[]> {

        const categorys = await Category.findAll()

        const CategoryList: CategoryOut[] = []

        categorys.every(category => CategoryList.push(new CategoryOutput(category.dataValues.id, category.dataValues.name).toObject()))

        return CategoryList;

    };

    static async selectCategoryById(id: number): Promise<CategoryOut> {
        
        const category = await Category.findByPk(id);

        const categoryReturn = new CategoryOutput(category?.dataValues.id, category?.dataValues.name);

        return categoryReturn;

    };

    static async selectWithFilters(obj:{}): Promise<CategoryOut[]> {

        const filterQuery: string[] = await Object.keys(obj);
        const filterValues: string | number[] = await Object.values(obj);
        const dynamicFilters: Record<string, any> = {};
        
        filterQuery.map((key: string, index: number) => {
            dynamicFilters[key] = {[Op.like]: `%${filterValues[index]}%`}
        })

        const filter: FindOptions = {
            where: dynamicFilters,
        }

        const filtedList = await Category.findAll(filter);

        const CategoryList:CategoryOut[] = [];

        filtedList.every(category => CategoryList.push(new CategoryOutput(category.dataValues.id, category.dataValues.name).toObject()));
        
        return CategoryList;
    };

    static async createCategory(category: CategoryIn) {
        
        const {name} = await category;
        Category.create({name: name})

    };

    static async updateItem(id: number, category:CategoryIn){
        Category.update({name: category.name},{
            where:{
                id:id
            }
        })
    };

    static deleteCategory(id: number) {
        Category.destroy({
            where:{
                id: id
            }
        })
    };

};