import express from 'express';
import expressWs from 'express-ws';
import { messageHandler } from '../utils/wsutils/wsMessageUtils.js'

export const connections = {}

const ews = expressWs(express);
const wss = ews.getWss()
export const router = express.Router()

router.ws("/chat/:id", (ws, req) => {
    ws.on("message", (data) => {
        const msg = JSON.parse(data)
        switch (msg.type) {
            case "message":
                messageHandler(msg, connections, msg.chatid);
                break;
            case "connection": {
                if (msg.username in connections) {
                    delete connections[msg.username]
                }
                connections[msg.username] = { username: msg.username, link: ws, chatId: msg.chatid }
                break;
            }
        }
    })
})