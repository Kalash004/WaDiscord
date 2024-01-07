import 'dotenv/config';
import { v4 as uuid } from 'uuid';

class Session {
    constructor(username, expiresAt) {
        this.username = username
        this.expiresAt = expiresAt
    }

    isExpired() {
        this.expiresAt < (new Date())
    }
}

export const sessions = {}

export const generateSession = (username) => {
    const token = uuid();
    const nowTime = new Date();
    const expiresAt = new Date(+nowTime + process.env.SECONDS_BEFORE_EXPIRATION * 1000);
    const session = new Session(username, expiresAt);
    sessions[token] = session;
    return { token: token, expires: expiresAt }
}

export const getSessionFromToken = (sessionToken) => {
    return sessions[sessionToken];
}

export const removeSession = (sessionToken) => {
    delete sessions[sessionToken];
}