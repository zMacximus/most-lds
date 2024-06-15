import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

export const db = new Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false,
  }
);

(async () => {
  try {
    await db.authenticate();
    console.log("Connection to database established successfully.");

    // await db.sync({ alter: true });
  } catch (error) {
    console.error("Connection to database failed.", error);
  }
})();

export default db;
