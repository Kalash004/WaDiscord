import { query } from "../../dbconn.js"
import { generateSession } from "../../services/sessionServices/sessionService.js"

export const checkNameNotSame = async (name) => {
    const result = await query("SELECT COUNT(*) FROM users WHERE users.name = ?", [name,])
    const count = result[0]['COUNT(*)']
    return count == 0
}


export const logUserInAndAddSession = async (req, res) => {
    const user = req.body.username
    const password = req.body.password
    const getPassword = async (name) => {
        const data = await query("SELECT password FROM users WHERE users.name = ?", [name,]);
        return data[0]["password"];
    }
    try {
        const resp = {
            message: ""
        }
        if (!checkNameNotSame(user)) {
            resp.message = `User with such name: ${user} doesnt exist`;
            return res.send(resp);
        }
        const pass = await getPassword(user);
        if (pass != password) {
            resp.message = "Wrong credentials"
            return res.send(resp);
        }
        resp.message = "Logged in"
        const session = generateSession(user);
        res.cookie("session_token", session.token, { expire: session.expires });
        res.cookie("username", req.body.username)
        return res.redirect("/chat/4");
    } catch (err) {
        console.log(err)
        res.status(333)
    }
}