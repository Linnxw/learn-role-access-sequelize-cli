import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST;
const dbUserName = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize(dbName,dbUserName,dbPassword,{
  host:dbHost,
  dialect:'mysql'
});

export default sequelizeConnection;