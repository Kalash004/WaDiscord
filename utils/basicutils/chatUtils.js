import { query } from "../../dbconn.js"


export const connectToChat = (chatId, res) => {
    res.redirect(`/chat/${chatId}`)
}

export const getChatId = async (chatname) => {
    const answer = await query("SELECT chatroomId FROM chatrooms WHERE name = ?", [chatname,])
    if (answer.length == 0) return 0
    return answer[0]["chatroomId"]
}

export const getChatName = async (id) => {
    const answer = await query("SELECT name FROM chatrooms WHERE chatroomId = ?", [id,])
    if (answer.length == 0) throw new Error("This chat doesnt exist")
    return answer[0]["name"]
}

export const addChat = async (chatName) => {
    const answer = await query("INSERT INTO chatrooms (name) VALUES (?)", [chatName,])
    return answer
}


