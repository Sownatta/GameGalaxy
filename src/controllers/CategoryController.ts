import { Request, Response } from 'express';
import CategoryService from '../services/category-service';
import { CategoryIn, CategoryOut } from "../models/CategoryTypes";
import { Category as CategoryOutput, CategoryInsert } from "../models/Category";

export class CategoryController {

    static async getAllCategorys(req: Request, res: Response) {
        
        const queryRequest: {} = await req.query;

        if(Object.keys(queryRequest).length === 0) {

            const CategoryList = await CategoryService.selectAll();

            console.log(CategoryList);

            res.json(CategoryList).status(200);
        }else {
            const CategoryList = await CategoryService.selectWithFilters(queryRequest);
            console.log(CategoryList);

            res.json(CategoryList).status(200);
        }
    };

    /* static async getCategoryById(req: Request, res: Response) {
        
        const categoryId = req.params.id;

        const listId = await CategoryService.selectCategoryById(Number(categoryId));

        res.json(listId).status(200);    
    }; */

    static async createCategory(req: Request, res: Response) {
        
        const newCategory = new CategoryInsert(req.body.name)   
    
        
       const create = await CategoryService.createCategory(newCategory.toObject());

        res.send('Categoria criada com sucesso.').status(201);
    };

    static async updateCategory(req: Request, res: Response) {
        
        const categoryId = await req.params.id;

        const newCategory = new CategoryInsert(req.body.name) 

        CategoryService.updateItem(Number(categoryId), newCategory.toObject())
        res.send('Categoria atualizada com sucesso.').status(204);
    };

    static async deleteCategory(req: Request, res: Response){
        const categoryId = await req.params.id;

        CategoryService.deleteCategory(Number(categoryId))
        res.send('Categoria deletada com sucesso.').status(204);
    };
}

export default CategoryController