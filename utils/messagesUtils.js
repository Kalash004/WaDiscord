import { query } from "../dbconn.js"
import { getUserIdByName } from "./utils.js"


export const readAllMessages = async (req, res) => {
    const getMessagesFromDb = async () => {
        const messages = await query("SELECT * FROM messages")
        return blog
    }
    try {
        const messages = await getMessagesFromDb()
        res.send(messages)
    } catch (err) {
        console.log(err)
        res.end(`Error : ${err}`)
    }
}

export const readMessagesByUser = async (req, res) => {
    const getMessagesFromDbById = async (id) => {
        const messages = await query("SELECT * FROM messages WHERE f_userId = ? LIMIT 1", [id])
        return messages
    }
    try {
        const id = getUserIdByName(req.name)
        const messages = await getMessagesFromDbById(id)
        res.send(messages)
    } catch (err) {
        console.log(err)
        res.end(`Error : ${err}`)
    }
}
