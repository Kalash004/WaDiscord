import { sessions,getSessionFromToken,removeSession } from "../services/sessionServices/sessionService.js"

export const isAuth = async (req, res, next) => {
    if (!req.cookies) {
        res.status(401).end()
        return
    }

    const sessionToken = req.cookies['session_token']

    if (!sessionToken) {
        res.status(401).end()
        return
    }

    userSession = getSessionFromToken(sessionToken);

    if (!userSession) {
        res.status(401).end()
        return
    }

    if (userSession.isExpired()) {
        removeSession(sessionToken)
        res.status(401).end()
        return
    }

    next()
}