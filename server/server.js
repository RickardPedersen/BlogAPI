require('dotenv').config()
const express = require('express')
const app = express()


let cors = require('cors')
app.use(cors())

app.use(express.json());
//app.use(express.urlencoded({ extended: true }))

//routes
const posts = require('./routes/post')
const comments = require('./routes/comment')
const users = require('./routes/user')
const authentication = require('./routes/authentication')

app.use('/posts', posts)
app.use('/comments', comments)
app.use('/users', users)
app.use('/authentication', authentication)

module.exports = app
