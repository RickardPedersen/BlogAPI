const express = require('express')
const app = express()
const port = 7070

let cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes
const posts = require('./routes/post')
const comments = require('./routes/comment')
const users = require('./routes/user')
app.use('/posts', posts)
app.use('/comments', comments)
app.use('/users', users)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
