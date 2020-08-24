const express = require('express')
const app = express()
const port = 7070

let cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes
const posts = require('./routes/posts')
const comments = require('./routes/comments')
app.use('/posts', posts)
app.use('/comments', comments)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
