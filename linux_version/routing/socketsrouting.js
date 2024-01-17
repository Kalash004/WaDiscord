import express from 'express';
import expressWs from 'express-ws';
import { messageHandler } from '../utils/wsutils/wsMessageUtils.js'
import { getSessionFromToken, sessions } from "../services/sessionServices/sessionService.js"


export const connections = {}

const ews = expressWs(express);
const wss = ews.getWss()
export const router = express.Router()

router.ws("/chat/:id", (ws, req) => {
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
        }
    })
})