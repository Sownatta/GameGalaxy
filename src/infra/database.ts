import { Sequelize, DataTypes } from "sequelize";
import path from "path";

const dbPath = path.join(__dirname,'gg_db')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
});

export const Category = sequelize.define('Category',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export const User = sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
});

export const Product = sequelize.define('Product',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    price:{
        type: DataTypes.REAL,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    imgUrl:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    } 
});

export  function dbInit(): void {
    
    sequelize   

    User

    Category

    Product

    new Promise<void>((resolve, rejects) => {
            sequelize.sync()
            .then(() =>{
                console.log('Database iniciado com sucesso.');
                resolve();
            })
            .catch((err)=>{
                console.log('Erro ao iniciar o Database');
                rejects(err);
                
            })
    });
}