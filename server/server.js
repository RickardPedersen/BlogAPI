const express = require('express')
const app = express()
const port = 7070

let cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes
const getBlogPosts = require('./routes/getBlogPosts')
const getBlogPost = require('./routes/getBlogPost')
const postBlogPost = require('./routes/postBlogPost')
const postComment = require('./routes/postComment')
const putBlogPost = require('./routes/putBlogPost')
const deleteBlogPost = require('./routes/deleteBlogPost')
app.use('/', getBlogPosts)
app.use('/', getBlogPost)
app.use('/', postBlogPost)
app.use('/', putBlogPost)
app.use('/', deleteBlogPost)
app.use('/', postComment)

//for client part
/*
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });*/

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
