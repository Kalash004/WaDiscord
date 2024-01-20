import mysql  from 'mysql2/promise';
import config from "./dbconfig.js";

const connection = await mysql.createConnection(config.db)

export async function query(sql, params) {
    const [rows,] = await connection.execute(sql, params);
    return rows;
}