import { query } from "../dbconn.js"
import { generateSession } from "../services/sessionServices/sessionService.js"

export const checkNameNotSame = async (name) => {
    const count = await query("SELECT COUNT(*) FROM user WHERE user.name = ?", [name])
    return count == 0
}


export const logUserInAndAddSession = async (req, res) => {
    const getPassword = async (name) => {
        return await query('SELECT password FROM users WHERE users.name = ?', [name,])
    }
    try {
        const resp = {
            message,
        }
        if (checkNameNotSame(req.body.name)) {
            resp.message = `User with such name: ${req.body.name} doesnt exist`;
            res.send(resp);
            return;
        }
        pass = getPassword(red.body.name);
        if (pass != req.body.password) {
            resp.message = "Wrong credentials"
            res.send(resp);
            return
        }
        resp.message = "Logged in"
        sessionToken, expiresAt = generateSession(req.body.name);
        res.cookie("session_token", sessionToken, { expires: expiresAt });
        res.send(resp);
    } catch (err) {
        console.log(err)
        res.end(err)
    }
}