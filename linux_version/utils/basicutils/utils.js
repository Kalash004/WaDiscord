import { query } from "../../dbconn.js"

export const getUserIdByName = async (name) => {
    const id = await query('SELECT userId FROM users WHERE users.name = ?', [name])
    return id
}

export const getChatIdByName = async (chatName) => {
    const id = await query('SELECT chatroomId FROM chatrooms WHERE chatrooms.name = ?', [chatName])
    return id
}
