import { saveMessageDB } from '../basicutils/messagesUtils.js'
import { getUserIdByName } from '../basicutils/utils.js'
import { clients } from '../../routing/socketsrouting.js'

export const messageHandler = (msg) => {
    sendMessageToDb(msg);
    sendMessagesToUsers(msg);
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

function sendMessagesToUsers(data) {
    for (const [ws, chatid] of Object.entries(clients)) {
        const msg = {
            type: "chatmessage",
            username: data.username,
            text: data.text,
        }
        ws.send(JSON.stringify(msg))
    }
}