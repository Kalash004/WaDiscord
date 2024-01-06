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
 
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
expressWs(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", apirotuer)
app.use("/", pagesrouter)



app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.APP_PORT}`)
})
