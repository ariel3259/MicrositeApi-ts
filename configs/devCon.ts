import {Sequelize} from "sequelize"

const sequelize: Sequelize = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.USER_DB,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.PORT_DB + ''),
    dialect: 'mysql'
});

export default sequelize;