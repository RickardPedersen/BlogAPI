const { getUser } = require('./user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function createToken(payload) {
    return jwt.sign(payload, secret, { expiresIn:'1h' })
}

module.exports = {
    login: async (loginObject) =>{
        let user = await getUser({ username: loginObject.username })
        if (user) {
            const correctPassword = bcrypt.compareSync(loginObject.password, user.password)
            if (correctPassword) {
                let token = createToken({ userId: user._id, role: user.role })
                //console.log(token)
                console.log('now we sending back token')
                return token
            } else {
                return false
            }
        } else {
            return false
        } 
    }
}
