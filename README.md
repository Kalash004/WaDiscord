# WaDiscord

### npm install ejs dotenv cookie-parser body-parser path url express express-ws mysql2 uuid

# API Documentation

## `GET /api/readmessages`

This API call is used to retrieve all messages for each chat.

### Inputs

-   None

### Cookies

-   `session_token`: Session token for authentication (For testing purposes, you can use `session_token = "tester"`)

### Returns

An array of message objects with the following structure:

```json
[
    {
        "messageId": "string",
        "text": "string",
        "f_userId": "string",
        "f_chatroomId": "string",
        "timestamp": "string"
    }
]
```
## `GET /api/readusermessages`

This API call is used to retrieve all messages sent by a specific user.

### Inputs

- `name` (in `req.body`): User name

### Cookies

- `session_token`: Session token for authentication (For testing purposes, you can use `session_token = "tester"`)

### Returns

An array of message objects with the following structure:

```json
[
    {
        "messageId": "string",
        "text": "string",
        "f_userId": "string",
        "f_chatroomId": "string",
        "timestamp": "string"
    }
]
```
## `GET /api/readchatroom`

This API call is used to retrieve messages from a specific chat.

### Inputs

- `chatid` (in `req.body`): Id of the chat to read

### Cookies

- `session_token`: Session token for authentication (For testing purposes, you can use `session_token = "tester"`)

### Returns

An array of message objects with the following structure:

```json
[
    {
        "name": "string",
        "text": "string"
    }
]
```
## `GET /api/messageswithword`

This API call is used to find messages containing a specific text (case insensitive).

### Inputs

- `word` (in `req.body`): Text to search for

### Cookies

- `session_token`: Session token for authentication (For testing purposes, you can use `session_token = "tester"`)

### Returns

An array of message objects with the following structure:

```json
[
    {
        "messageId": "string",
        "text": "string",
        "f_userId": "string",
        "f_chatroomId": "string",
        "timestamp": "string"
    }
]
```