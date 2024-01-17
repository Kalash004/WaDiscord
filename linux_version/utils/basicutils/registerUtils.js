import { query } from "../../dbconn.js"


export const checkNameNotSame = async (name) => {
    const result = await query("SELECT COUNT(*) FROM users WHERE users.name = ?", [name,])
    const count = result[0]['COUNT(*)']
    return count == 0
}


export const registerUser = async (req, res) => {
    const insertUser = async (username, password) => {
        return await query('INSERT INTO users(name, password) VALUES (?,?)', [username, password])
    }
    try {
        const resp = {
            message: ""
        }
        const same = await checkNameNotSame(req.body.username)
        if (!same) {
            resp.message = `Unsuccessful registration: ${req.body.username} already taken username`;
            return res.redirect("/");
        }

        await insertUser(req.body.username, req.body.password)
        return res.redirect("/login");
    } catch (err) {
        console.log(err)
        return res.end(err)
    }
}