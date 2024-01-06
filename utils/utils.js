import { query } from "../dbconn.js"

export const getUserIdByName = async (name) => {
    id = await query('SELECT userId FROM users WHERE users.name = ?' ,[name])
    return id
}