import express from 'express';
import expressWs from 'express-ws';
import { isAuth } from '../utils/basicutils/authUtils.js';
import { getMessagesFromChatByChatId } from '../utils/basicutils/messagesUtils.js';
import { getChatName } from '../utils/basicutils/chatUtils.js';
import 'dotenv/config';



export const router = express.Router()

// router.post('/register', registerUser);
// router.post('/login', logUserInAndAddSession);
router.get("/login", (req, res) => {
    res.render("login");
})
router.get("/register", (req, res) => {
    res.render("register", { message: "" });
})
router.get("/", (req, res) => {
    res.render("index");
})

router.get("/home", isAuth, (req, res) => {
    res.render("home", { username: req.cookies["username"] })
})

router.get("/chats", (req, res) => {
    res.render("chatdashboard")
})


//   {
// sender: "F",
// text: "f"
// },
router.get("/chat/:id", isAuth, async (req, res) => {
    const id = req.params.id
    const chatname = await getChatName(id);
    const old_messages = await getMessagesFromChatByChatId(id);
    res.cookie("chatid", id)
    res.render("chat", {
        chatname: chatname,
        messages: old_messages,
    })
})