import { query } from "../../dbconn.js"

export const insertUser = async (username, password) => {
    return await query('INSERT INTO users(name, password) VALUES (?,?)', [username, password])
}

