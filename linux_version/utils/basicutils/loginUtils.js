import { query } from "../../dbconn.js"

export const getPassword = async (name) => {
    const data = await query("SELECT password FROM users WHERE users.name = ?", [name,]);
    if (data[0] == undefined) return null
    return data[0]["password"];
}


