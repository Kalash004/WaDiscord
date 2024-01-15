import express from 'express';
import expressWs from 'express-ws';
import { messageHandler } from '../utils/wsutils/wsMessageUtils.js'

export const connections = {}

const ews = expressWs(express);
const wss = ews.getWss()
export const router = express.Router()

router.ws("/chat/:id", (ws, req) => {
    ws.on('connection', (client) => {
        console.log("Called")
        console.log(client)
    })

    ws.on("message", (data) => {
        const msg = JSON.parse(data)
        console.log(wss.clients)
        console.log(JSON.stringify(msg))
        switch (msg.type) {
            case "message":
                messageHandler(msg);
                break;
            case "connection": {
                // if (connections)
                // clients[ws] = msg.chatid
                break;
            }
        }
    })
})