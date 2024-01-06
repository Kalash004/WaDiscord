import express from 'express';
import { isAuth } from "../utils/authUtils.js";
import { registerUser } from "../utils/registerUtils.js";
import { logUserInAndAddSession } from "../utils/loginUtils.js";

export const router = express.Router()

router.post('/register', registerUser);
router.post('/login', logUserInAndAddSession);