import { query } from "../dbconn.js"
import { getUserIdByName } from "./utils.js"

export const createChat = async (req, res) => {
    const chatName = req.params.chatName
    const addChat = async (chatName) => {
        const answer = await query("INSERT INTO chatrooms (name) VALUES (?)", [chatName,])
        return answer
    }
    addChat(chatName)
}

