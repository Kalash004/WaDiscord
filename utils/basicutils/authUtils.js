import { sessions, getSessionFromToken, removeSession } from "../../services/sessionServices/sessionService.js"

export const isAuth = async (req, res, next) => {
    if (!req.cookies) {
        return res.status(401).end()
    }

    const sessionToken = req.cookies['session_token']
    if (sessionToken === 'undefined') {
        return res.status(401).end();
    }

    if (!sessionToken) {
        return res.status(401).end()
    }

    const userSession = getSessionFromToken(sessionToken);

    if (!userSession) {
        return res.status(401).end()
    }

    if (userSession.isExpired()) {
        removeSession(sessionToken)
        return res.status(401).end()
    }

    next()
}