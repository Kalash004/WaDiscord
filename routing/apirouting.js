import express from 'express';
import { isAuth } from "../utils/basicutils/authUtils.js";
import { registerUser } from "../utils/basicutils/registerUtils.js";
import { logUserInAndAddSession } from "../utils/basicutils/loginUtils.js";
import { connectChat, createChat } from '../utils/basicutils/chatUtils.js';

export const router = express.Router()

router.post('/register', registerUser);
router.post('/login', logUserInAndAddSession);
router.post('/connect', isAuth, connectChat);
router.post('/create', isAuth, createChat);