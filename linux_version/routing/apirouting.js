import express from 'express';
import { isAuth } from "../utils/basicutils/authUtils.js";
import {
    registerUserHandler,
    logUserInAndAddSessionHandler,
    connectChatHandler,
    createChatHandler,
    readAllMessagesHandler,
    readMessagesByUserHandler,
    readChatRoomHandler,
    readMessageByTextHandler
} from "../handlers/handlers.js"

export const router = express.Router()

/**
 * This api call is used when we are registering a user
 */
router.post('/register', registerUserHandler);
/**
 * This api call is used when we are logging a user in
 */
router.post('/login', logUserInAndAddSessionHandler);
/**
 * This api call is used to connect a user to an http chat page
 */
router.post('/connect', isAuth, connectChatHandler);
/**
 * This api call is used to create an http chat page and connect user to it
 */
router.post('/create', isAuth, createChatHandler);


/*
This api call is used to see all messages for each chat
Inputs: None
Cookies: session_token (for testing purpouses can use session_token = "tester")
Returns: 
[
    {
        "messageId",
        "text":,
        "f_userId":,
        "f_chatroomId":,
        "timestamp":
    },
]
 */
router.get('/readmessages', isAuth, readAllMessagesHandler)


/*
This api call is used to read all messages the user sent 
Inputs: (req.body.name) name - User name
Cookies: session_token (for testing purpouses can use session_token = "tester")
Returns: 
[
    {
        "messageId":,
        "text":,
        "f_userId":,
        "f_chatroomId":,
        "timestamp":
    },
] 
 */
router.get('/readusermessages', isAuth, readMessagesByUserHandler)


/*
This api call is used to read messages from a concrete chat
Inputs: (req.body.chatid) chatid - Id of chat you read
Cookies: session_token (for testing purpouses can use session_token = "tester")
Returns: 
[
    {
        "name":,
        "text":
    },
] 
 */
router.get('/readchatroom', isAuth, readChatRoomHandler)

/*
This api call is used to find messages with concrete text inside (case insensetive)
Inputs: (req.body.word) word - Id of chat you read
Cookies: session_token (for testing purpouses can use session_token = "tester")
Returns: 
[
    {
        "messageId":
        "text":
        "f_userId":
        "f_chatroomId": 
        "timestamp":
    },
] 
 */
router.get('/messageswithword', isAuth, readMessageByTextHandler) 