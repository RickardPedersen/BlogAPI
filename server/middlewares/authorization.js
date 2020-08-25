const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

module.exports = {
    auth: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.sendStatus(403)
        }
    
        const token = req.headers.authorization.replace("Bearer ", "")
        console.log(token)
    
        try {
            const payload = jwt.verify(token, secret)
            req.user = payload
            next()
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.status(403).send('Your token has expired')
            } else if (error.message === 'invalid token') {
                res.status(403).send(error.message)
            } else {
                console.log(error)
                res.sendStatus(500) 
            }
        }
    },
    checkUserId: (req, res, next) => {
        // TODO: better checks, req to db to get id
        if (req.user.userId === req.body.userId || req.user.userId === req.params.id) {
            console.log('correct user')
            next()
        } else {
            console.log('wrong user')
            res.sendStatus(403)
        }
    }
}
