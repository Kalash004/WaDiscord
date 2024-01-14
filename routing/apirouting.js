import express from 'express';
import { isAuth } from "../utils/authUtils.js";
import { registerUser } from "../utils/registerUtils.js";
import { logUserInAndAddSession } from "../utils/loginUtils.js";
import { connectChat, createChat } from '../utils/chatUtils.js';

export const router = express.Router()

router.post('/register', registerUser);
router.post('/login', logUserInAndAddSession);
router.post('/connect', connectChat);
router.post('/create', createChat);