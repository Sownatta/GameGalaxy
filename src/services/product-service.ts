import { Sequelize, FindOptions, Op } from "sequelize";
import { Product } from "../infra/database";
import { ProductIn, ProductOut } from "../models/ProductTypes";
import { Product as ProductOutput, ProductInsert } from "../models/Product";

export default class ProductService {

    static async selectAll(): Promise<ProductOut[]> {

        const products = await Product.findAll()

        const ProductList: ProductOut[] = []

        products.every(product => ProductList.push(new ProductOutput(product.dataValues.id, product.dataValues.name, product.dataValues.stock, product.dataValues.categoryId, product.dataValues.price, product.dataValues.description, product.dataValues.imgUrl, product.dataValues.userId).toObject()))

        return ProductList;

    };

    static async selectProductById(id: number): Promise<ProductOut> {
        
        const product = await Product.findByPk(id);

        const productReturn = new ProductOutput(product?.dataValues.id, product?.dataValues.name, product?.dataValues.stock, product?.dataValues.categoryId, product?.dataValues.price, product?.dataValues.description, product?.dataValues.imgUrl, product?.dataValues.userId);

        return productReturn;

    };

    static async selectWithFilters(obj:{}): Promise<ProductOut[]> {

        const filterQuery: string[] = await Object.keys(obj);
        const filterValues: string | number[] = await Object.values(obj);
        const dynamicFilters: Record<string, any> = {};
        
        filterQuery.map((key: string, index: number) => {
            dynamicFilters[key] = {[Op.like]: `%${filterValues[index]}%`}
        })

        const filter: FindOptions = {
            where: dynamicFilters,
        }

        const filtedList = await Product.findAll(filter);

        const ProductList:ProductOut[] = [];

        filtedList.every(product => ProductList.push(new ProductOutput(product.dataValues.id, product.dataValues.name, product.dataValues.stock, product.dataValues.categoryId, product.dataValues.price, product.dataValues.description, product.dataValues.imgUrl, product.dataValues.userId).toObject()));
        
        return ProductList;
    };

    static async createProduct(product: ProductIn) {
        
        const {name, stock, categoryId, price, description, imgUrl, userId} = await product;
        Product.create({name: name, stock: stock, categoryId: categoryId, price: price, description: description, imgUrl: imgUrl, userId: userId})

    };

    static async updateItem(id: number, product:ProductIn){
        Product.update({name: product.name, stock: product.stock, categoryId: product.categoryId, price: product.price, description: product.description, imgUrl: product.imgUrl, userId: product.userId},{
            where:{
                id:id
            }
        })
    };

    static deleteProduct(id: number) {
        Product.destroy({
            where:{
                id: id
            }
        })
    };

};