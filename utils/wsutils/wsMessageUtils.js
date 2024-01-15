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
        console.log(key)
        if (key == data.username) { continue }
        console.log(`${key} : after (${key} == ${data.username})`)
        console.log(`${item.chatId} == ${chatid}`)
        if (item.chatId == chatid) {
            console.log(`Sending to ${item.username}`)
            item.link.send(JSON.stringify(msg))
        }
    }
}