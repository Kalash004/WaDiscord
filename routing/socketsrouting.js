import express from 'express';
import expressWs from 'express-ws';
import { wsChatHandler } from '../handlers/handlers.js'

const ews = expressWs(express);
const wss = ews.getWss()
export const router = express.Router()

router.ws("/chat/:id", (ws) => wsChatHandler(ws))

