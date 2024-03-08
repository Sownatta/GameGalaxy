import express from 'express';
import { CategoryController } from './controllers/CategoryController';
import { ProductController } from './controllers/ProductController';
import { UserController } from './controllers/UserController';
//import { isAuthenticated } from './lib/routesAuthenticator';
//import { userValidate } from './lib/userValidate';

const router = express.Router();

//Rotas de Categorias
router.get('/categories', CategoryController.getAllCategorys);
router.post('/category-register', CategoryController.createCategory);
router.put('/category/:id', CategoryController.updateCategory);
router.delete('/category/:id', CategoryController.deleteCategory);

//Rotas de Produtos
router.get('/', ProductController.redirect);
router.get('/home', ProductController.getHomePage);
router.get('/catalog', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getProductById);
router.get('/product-register', ProductController.formProduct);
router.get('/product-update/:id', ProductController.redirectUpdate);
router.get('/product-delete/:id', ProductController.eraseProduct);
router.post('/product-register', ProductController.createProduct);
router.post('/product-update/:id', ProductController.editProduct);
router.put('/product/:id', ProductController.updateProduct);
//router.patch('/product/:id', ProductController.partUpdateProduct);
router.delete('/product/:id', ProductController.deleteProduct);

//Rotas de Usuários
router.get('/users', UserController.getAllUsers);
router.get('/user/:id', UserController.getUserById);
//router.get('/login', UserController.login);
router.get('/user-register', UserController.formUser);
//router.post('/login', UserController.logged);
router.post('/user-register', UserController.createUser);
router.put('/user/:id', UserController.updateUser);
//router.patch('/user/:id', UserController.partUpdateUser);
router.delete('/user/:id', UserController.deleteUser);

export default router;