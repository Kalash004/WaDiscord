import { saveMessageDB } from '../basicutils/messagesUtils.js'
import { getUserIdByName } from '../basicutils/utils.js'
import { getSessionFromToken, sessions } from "../../services/sessionServices/sessionService.js"


export const messageHandler = async (msg, ws, chatid) => {
    await sendMessageToDb(msg);
    await sendMessagesToUsers(msg, ws, chatid);
}

async function sendMessageToDb(msg) {
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

async function sendMessagesToUsers(data, connections, chatid) {
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