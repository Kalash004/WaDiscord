import { query } from "../../dbconn.js"

export const getMessagesFromChatByChatId = async (chatId) => {
    const messages = await query("SELECT users.name as name, messages.text as text FROM messages INNER JOIN users ON messages.f_userId = users.userId WHERE messages.f_chatroomId = ? ORDER BY messageId", [chatId,])
    return messages
}

export const getMessagesFromDb = async () => {
    const messages = await query("SELECT * FROM messages")
    return messages
}

export const addMessage = async (chatId, userId, messageText) => {
    const answer = await query("INSERT INTO messages (text, f_userId, f_chatroomId) VALUES (?, ?, ?)", [messageText, userId, chatId])
    return answer
}

export const getMessagesFromDbById = async (id) => {
    const messages = await query("SELECT * FROM messages WHERE f_userId = ?", [id])
    return messages
}

export const saveMessageDB = async (data) => {
    try {
        await addMessage(data.chatId, data.userId, data.messageText)
    } catch (err) {
        console.log(err);
        res.status(505).end();
        return;
    }
    return;
}