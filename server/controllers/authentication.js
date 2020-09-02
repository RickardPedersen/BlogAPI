const { getUser, authenticate } = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function createToken(payload) {
    return jwt.sign(payload, secret, { expiresIn:'1h' })
}

module.exports = {
    login: async (req, res) =>{
        let result = await authenticate(req.body.username, req.body.password)
        console.log(result)

        if (result.success) {
            res.status(200).json(result.token)
        } else if (result.error === 'wrong password') {
            res.status(403).send('Wrong Password')
        } else if (result.error === 'wrong username') {
            res.status(404).send('Username Not Found')
        } else {
            res.sendStatus(500)
        }
    }
}
