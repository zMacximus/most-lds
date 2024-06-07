import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection to database established successfully.')

        await sequelize.sync({alter:true})
    } catch(error) {
        console.error('Connection to database failed.', error)
    }
})();

export default sequelize;

