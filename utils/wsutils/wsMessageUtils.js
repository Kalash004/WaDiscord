import { saveMessageDB } from '../basicutils/messagesUtils.js'
import { getUserIdByName } from '../basicutils/utils.js'

export const messageHandler = (msg, ws, chatid) => {
    sendMessageToDb(msg);
    sendMessagesToUsers(msg, ws, chatid);
}

async function sendMessageToDb(msg) {
    const userid = await getUserIdByName(msg.username)
    const data = {
        //data.chatId, data.userId, data.messageText
        chatId: msg.chatid,
        userId: userid[0]["userId"],
        messageText: msg.text,
    }
    saveMessageDB(data)
}

function sendMessagesToUsers(data, connections, chatid) {
    const msg = {
        type: "chatmessage",
        username: data.username,
        text: data.text,
    }
    for (const [key, item] of Object.entries(connections)) {
        if (key == data.username) { continue }
        if (item.chatId == chatid) {
            item.link.send(JSON.stringify(msg))
        }
    }
}