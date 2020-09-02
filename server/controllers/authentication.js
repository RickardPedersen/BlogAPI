const { getUser } = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function createToken(payload) {
    return jwt.sign(payload, secret, { expiresIn:'1h' })
}

module.exports = {
    login: async (req, res) =>{
        let user = await getUser({ username: req.body.username })

        if (user) {
            const correctPassword = bcrypt.compareSync(req.body.password, user.password)
            if (correctPassword) {
                let token = createToken({ userId: user._id, role: user.role })
                res.status(200).json(token)
            } else {
                res.status(403).send('Wrong Password')
            }
    
            //res.status(200).json(user)
        } else {
            res.status(404).send('Not Found')
        } 
    }
}
