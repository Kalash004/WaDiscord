import { saveMessageDB } from '../basicutils/messagesUtils.js'
import { getUserIdByName } from '../basicutils/utils.js'

export const messageHandler = async (msg, ws, chatid) => {
    await sendMessageToDb(msg);
    await sendMessagesToUsers(msg, ws, chatid);
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

async function sendMessagesToUsers(data, connections, chatid) {
    const msg = {
        type: "chatmessage",
        username: data.username,
        text: data.text,
    }
    for (const [key, item] of Object.entries(connections)) {
        if (key == data.username) { continue }
        if (item.chatId == chatid) {
            await item.link.send(JSON.stringify(msg))
        }
    }
}