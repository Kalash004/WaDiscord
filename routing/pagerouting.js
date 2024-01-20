import express from 'express';
import { isAuth } from '../utils/basicutils/authUtils.js';
import { getSessionFromToken } from "../services/sessionServices/sessionService.js"
import { chatConnectionHandler } from "../handlers/handlers.js"
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
    res.render("home", { username: getSessionFromToken(req.cookies['session_token']).username })
})
router.get("/chats", (req, res) => {
    res.render("chatdashboard")
})
router.get("/chat/:id", isAuth, chatConnectionHandler)
