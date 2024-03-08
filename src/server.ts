import express from 'express';
import router from './routes';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
//import swaggerJSDoc from 'swagger-jsdoc';
import swaggerDocument from '../swagger.json'
import session from 'express-session';
import morgan from "morgan";
import "dotenv/config";

const server = express();

//Configuração Express-session
server.use(session({
    secret: "senha123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

// Configuração do Swagger UI
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded());
server.use(express.static(path.join(__dirname, '..', 'public', 'stylesheets')));
server.use(express.static(path.join(__dirname, '..', 'public', 'images')));
server.use(router);


server.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor online na porta ${process.env.PORT}`);
    
});

export default server;