import express from 'express';
import { isAuth } from '../utils/authUtils.js';

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