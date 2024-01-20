import { query } from "../../dbconn.js"

export const getUserIdByName = async (name) => {
    const id = await query('SELECT userId FROM users WHERE users.name = ?', [name])
    return id
}

export const getChatIdByName = async (chatName) => {
    const id = await query('SELECT chatroomId FROM chatrooms WHERE chatrooms.name = ?', [chatName])
    return id
}

export const checkUserDoesntExist = async (name) => {
    const result = await query("SELECT COUNT(*) FROM users WHERE users.name = ?", [name,])
    const count = result[0]['COUNT(*)']
    return count == 0
}