import { query } from "../dbconn.js"
import { getUserIdByName } from "./utils.js"

export const createChat = async (req, res) => {
    const chatname = req.body.chatname
    const addChat = async (chatName) => {
        const answer = await query("INSERT INTO chatrooms (name) VALUES (?)", [chatName,])
        return answer
    }
    await addChat(chatname)
    const id = await getChatId(chatname)
    if (id == 0) return res.status(404).end()
    connectToChat(id, req, res)
}

export const connectChat = async (req, res) => {
    const chatname = req.body.chatname
    const id = await getChatId(chatname)
    if (id == 0) return res.status(404).end()
    connectToChat(id, req, res)
}

function connectToChat(chatId, req, res) {
    res.redirect(`/chat/${chatId}`)
}

export const getChatId = async (chatname) => {
    const answer = await query("SELECT chatroomId FROM chatrooms WHERE name = ?", [chatname,])
    if (answer.length == 0) return 0
    return answer[0]["chatroomId"]
}