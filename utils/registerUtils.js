import { query } from "../dbconn.js"


export const checkNameNotSame = async (name) => {
    const count = await query("SELECT COUNT(*) FROM user WHERE user.name = ?", [name])
    return count == 0
}


export const registerUser = async (req, res) => {
    const insertUser = async (name, password) => {
        return await query('INSERT INTO users(name, password) VALUES (?,?)', [name, password])
    }
    try {
        const resp = {
            message: ""
        }
        if (!checkNameNotSame(req.body.name)){
            resp.message = `Unsuccessful registration: ${req.body.name} already taken username`;
            res.send(resp);
            return;
        }
        
        await insertUser(req.body.name, req.body.password)
        res.send(resp)
    } catch (err) {
        console.log(err)
        res.end(err)
    }
}