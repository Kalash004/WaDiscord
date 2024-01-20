import { saveMessageDB } from '../basicutils/messagesUtils.js'
import { getUserIdByName } from '../basicutils/utils.js'
import { getSessionFromToken } from "../../services/sessionServices/sessionService.js"

export const sendMessageToDb = async (msg) => {
    const session = getSessionFromToken(msg.session_cookie)
    const userid = await getUserIdByName(session.username)
    const data = {
        //data.chatId, data.userId, data.messageText
        chatId: session.currentChatId,
        userId: userid[0]["userId"],
        messageText: msg.text,
    }
    saveMessageDB(data)
}

export const sendMessagesToUsers = async (data, connections, chatid) => {
    const msg = {
        type: "chatmessage",
        username: getSessionFromToken(data.session_cookie).username,
        text: data.text,
    }
    const username = getSessionFromToken(data.session_cookie).username
    for (const [key, item] of Object.entries(connections)) {
        if (key == data.username) { continue }
        if (item.chatId == chatid) {
            await item.link.send(JSON.stringify(msg))
        }
    }
}