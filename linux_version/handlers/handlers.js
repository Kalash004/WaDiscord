import { getMessagesFromChatByChatId, getMessagesFromDb, getMessagesFromDbById, saveMessageDB } from "../utils/basicutils/messagesUtils.js"
import { getUserIdByName, getChatIdByName, checkUserDoesntExist } from "../utils/basicutils/utils.js"
import { getSessionFromToken, generateSession } from "../services/sessionServices/sessionService.js"
import { addChat, getChatId, connectToChat, getChatName } from "../utils/basicutils/chatUtils.js"
import { getPassword } from "../utils/basicutils/loginUtils.js"
import { insertUser } from "../utils/basicutils/registerUtils.js"
import { sendMessageToDb, sendMessagesToUsers } from "../utils/wsutils/wsMessageUtils.js"

// Chat Handlers V

export const createChatHandler = async (req, res) => {
    const chatname = req.body.chatname
    await addChat(chatname)
    const id = await getChatId(chatname)
    if (id == 0) return res.status(404).end()
    connectToChat(id, res)
}

export const connectChatHandler = async (req, res) => {
    const chatname = req.body.chatname
    const id = await getChatId(chatname)
    if (id == 0) return res.status(404).end()
    connectToChat(id, res)
}

export const readChatRoomHandler = async (req, res) => {
    const chatid = req.body.chatid;
    try {
        const data = await getMessagesFromChatByChatId(chatid)
        res.send(data)
    } catch (err) {
        console.log(err);
        res.status(505).end();
        return;
    }
}

// Message Handlers

export const readAllMessagesHandler = async (req, res) => {
    try {
        const messages = await getMessagesFromDb()
        res.send(messages)
    } catch (err) {
        console.log(err);
        res.status(505).end();
        return;
    }
    return;
}

export const readMessagesByUserHandler = async (req, res) => {
    try {
        const result = await getUserIdByName(req.body.name)
        const id = result[0]["userId"]
        const messages = await getMessagesFromDbById(id)
        res.send(messages)
    } catch (err) {
        console.log(err);
        res.status(505).end();
        return;
    }
    return;
}

export const readMessageByTextHandler = async (req, res) => {
    try {
        const requestedWord = req.body.word
        const allMessages = await getMessagesFromDb()
        const result = []
        for (const [key, item] of Object.entries(allMessages)) {
            if (item.text.toUpperCase().includes(requestedWord.toUpperCase())) {
                result.push(item)
            }
        }
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(505).end();
        return;
    }
    return;
}

export const sendMessageHandler = async (req, res) => {
    const chatName = req.params.chatName;
    const message = req.body.message;
    const cookieToken = req.cookies['session_token'];
    const userName = getSessionFromToken(cookieToken).username;
    data = {
        chatId: getChatIdByName(chatName),
        userId: getUserIdByName(userName),
        messageText: message
    }
    try {
        saveMessageDB(data)
    } catch (err) {
        console.log(err);
        res.status(505).end();
        return;
    }
    return;
}

// Connection Handlers

export const chatConnectionHandler = async (req, res) => {
    const id = req.params.id
    const session_token = req.cookies["session_token"]
    let session = getSessionFromToken(session_token)
    session.currentChatId = id
    const chatname = await getChatName(id);
    const old_messages = await getMessagesFromChatByChatId(id);
    res.render("chat", {
        chatname: chatname,
        messages: old_messages,
        username: getSessionFromToken(req.cookies['session_token']).username
    })
}

// Login Handlers

export const logUserInAndAddSessionHandler = async (req, res) => {
    const user = req.body.username
    const password = req.body.password
    try {
        const resp = {
            message: ""
        }
        if (!checkUserDoesntExist(user)) {
            resp.message = `User with such name: ${user} doesnt exist`;
            return res.send(resp);
        }
        const pass = await getPassword(user);
        if (pass != password) {
            resp.message = "Wrong credentials"
            return res.send(resp);
        }
        resp.message = "Logged in"
        const session = generateSession(user);
        res.cookie("session_token", session.token, { expire: session.expires });
        return res.redirect("/home");
    } catch (err) {
        console.log(err)
        res.status(333)
    }
}

// Register Handlers 

export const registerUserHandler = async (req, res) => {
    try {
        const resp = {
            message: ""
        }
        const same = await checkUserDoesntExist(req.body.username)
        if (!same) {
            resp.message = `Unsuccessful registration: ${req.body.username} already taken username`;
            return res.redirect("/");
        }
        await insertUser(req.body.username, req.body.password)
        return res.redirect("/login");
    } catch (err) {
        console.log(err)
        return res.end(err)
    }
}

// Websockets Handlers 
export const connections = {} // Possibly worst, but simplest way to hold onto connections

export const messageHandler = async (msg, ws, chatid) => {
    await sendMessageToDb(msg);
    await sendMessagesToUsers(msg, ws, chatid);
}

export const wsChatHandler = async (ws) => {
    ws.on("message", (data) => {
        const msg = JSON.parse(data)
        switch (msg.type) {
            case "message":
                const chatid = getSessionFromToken(msg.session_cookie).currentChatId
                messageHandler(msg, connections, chatid);
                break;
            case "connection": {
                const chatId = getSessionFromToken(msg.session).currentChatId
                const username = getSessionFromToken(msg.session).username
                if (username in connections) {
                    delete connections[username]
                }
                connections[username] = { username: username, link: ws, chatId: chatId }
                break;
            }
            case "ping": {
                const msg = {
                    type: "pong",
                }
                ws.send(JSON.stringify(msg));
                break;
            }
        }
    })
}