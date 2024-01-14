import express from 'express';
import expressWs from 'express-ws';
import { messageHandler } from '../utils/wsutils/wsMessageUtils.js'

export const clients = {}

expressWs(express);
export const router = express.Router()

router.ws("/chat/:id", (ws, req) => {
    ws.on("message", (data) => {
        const msg = JSON.parse(data)
        switch (msg.type) {
            case "message":
                messageHandler(msg)
            case "connection": {
                clients[ws] = msg.chatid
            }
        }
    })
})