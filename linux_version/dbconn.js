import mysql  from 'mysql2/promise';
import config from "./dbconfig.js";

export async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [rows,] = await connection.execute(sql, params);
    return rows;
}