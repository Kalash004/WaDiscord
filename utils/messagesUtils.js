import { query } from "../dbconn.js"
import { getUserIdByName, getChatIdByName } from "./utils.js"
import { getSessionFromToken } from "../services/sessionServices/sessionService.js"

export const getMessagesFromChatByChatId = async (chatId) => {
    const messages = await query("SELECT users.name as name, messages.text as text FROM messages INNER JOIN users ON messages.f_userId = users.userId WHERE messages.f_chatroomId = ?", [chatId,])
    return messages
}

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


export const sendMessage = async (req, res) => {
    const chatName = req.params.chatName
    const message = req.body.message
    const cookieToken = req.cookies['session_token']
    const addMessage = async (chatId, userId, messageText) => {
        const answer = await query("INSERT INTO messages (text, f_userId, f_chatroomId) VALUES (?, ?, ?)", [messageText, userId, chatId])
        return answer
    }
    const userName = getSessionFromToken(cookieToken).username
    const userId = getUserIdByName(userName)
    const chatId = getChatIdByName(chatName)
    try {
        await addMessage(chatId, userId, message)
    } catch (err) {
        console.log(err)
        res.status(501).end()
    }
}

