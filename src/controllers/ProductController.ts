import { Request, Response } from 'express';
import ProductService from '../services/product-service';
import { ProductIn, ProductOut } from "../models/ProductTypes";
import { Product as ProductOutput, ProductInsert } from "../models/Product";

export class ProductController {

    static async redirect(req: Request, res: Response) {
        res.redirect('/home');
    };

    static async getHomePage(req: Request, res: Response) {
        res.render('layout', { body: '../views/home.ejs' });
    };

    static async formProduct(req: Request, res: Response) {
        res.render('layout', { body: '../views/formProduto.ejs' });
    };

    static async redirectUpdate(req: Request, res: Response) {
        const productId = req.params.id;
        res.render('layoutProduct', { body: '../views/formEdit.ejs', productId })
    };

    static async editProduct(req: Request, res: Response) {
        
        const productId = await req.params.id;

        const newProduct = new ProductInsert(req.body.name, req.body.stock, req.body.categoryId, req.body.price, req.body.description, req.body.imgUrl, req.body.userId) 

        ProductService.updateItem(Number(productId), newProduct.toObject())
        res.redirect('/catalog');
    };

    static async eraseProduct(req: Request, res: Response) {
        
        const productId = await req.params.id;

        ProductService.deleteProduct(Number(productId))
        res.redirect('/catalog');

        
    };

    static async getAllProducts(req: Request, res: Response) {
        
        const queryRequest: {} = await req.query;
        let ProductList;

        if(Object.keys(queryRequest).length === 0) {

            ProductList = await ProductService.selectAll();

            console.log(ProductList);

            res.render('layout', { body: '../views/catalogo.ejs', ProductList: ProductList });
        }else {
            ProductList = await ProductService.selectWithFilters(queryRequest);
            console.log(ProductList);

            res.render('layout', { body: '../views/catalogo.ejs', ProductList: ProductList });
        }
    };

    static async getProductById(req: Request, res: Response) {
        
        const productId = req.params.id;

        try {

            const produto = await ProductService.selectProductById(Number(productId));
        
            res.render('layoutProduct', { body: '../views/produto.ejs', product: produto });

          } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao buscar o produto por ID.');
          }  
    };

    static async createProduct(req: Request, res: Response) {
        
        const newProduct = new ProductInsert(req.body.name, req.body.stock, req.body.categoryId, req.body.price, req.body.description, req.body.imgUrl, req.body.userId)   
    
        console.log(newProduct.toObject());

        const create = await ProductService.createProduct(newProduct.toObject());

        res.redirect('/catalog');
    };

    static async updateProduct(req: Request, res: Response) {
        
        const productId = await req.params.id;

        const newProduct = new ProductInsert(req.body.name, req.body.stock, req.body.categoryId, req.body.price, req.body.description, req.body.imgUrl, req.body.userId) 

        ProductService.updateItem(Number(productId), newProduct.toObject())
        res.redirect('/catalog');
    };

    static async deleteProduct(req: Request, res: Response){
        const productId = await req.params.id;

        ProductService.deleteProduct(Number(productId))
        res.redirect('/catalog');
    };
}

export default ProductController