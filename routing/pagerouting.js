import express from 'express';

export const router = express.Router()

// router.post('/register', registerUser);
// router.post('/login', logUserInAndAddSession);
router.get("/login", (req, res) => {
    res.render("login");
})
router.get("/register", (req, res) => {
    res.render("register");
})
router.get("/", (req, res) => {
    res.render("index");
})