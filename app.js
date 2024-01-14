import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { query } from "./dbconn.js";
import expressWs from 'express-ws';
import { router as apirotuer } from "./routing/apirouting.js";
import { router as pagesrouter } from "./routing/pagerouting.js"
import { isAuth } from './utils/authUtils.js';
 
const app = express(); 
expressWs(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", apirotuer)
app.use("/", pagesrouter)

app.ws("/chat", (ws, req) => {
    ws.on("message", (msg) => {
        console.log(`messaged ${msg}`)
    })
})


app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.APP_PORT}`)
})
