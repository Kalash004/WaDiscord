import express from 'express';
import expressWs from 'express-ws';
import { isAuth } from '../utils/authUtils.js';
import { getMessagesFromChatByChatId } from '../utils/messagesUtils.js'


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
    res.render("home")
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
    const old_messages = await getMessagesFromChatByChatId(id)
    res.render("chat", {
        messages: old_messages
    })
})