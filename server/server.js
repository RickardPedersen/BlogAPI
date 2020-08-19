const express = require('express')
const app = express()
const port = 8080



app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes
const getBlogPosts = require('./routes/getBlogPosts')
app.use('/', getBlogPosts)

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.get('/blog/:id', async (req, res) => {
    try {
        let blogPost = await db.posts.findOne({ _id: req.params.id})
        let comments = await db.comments.find({ blogPostId: req.params.id})

        if (blogPost) {
            let resObj = {
                blogPost,
                comments
            }
    
            res.status(200).json(resObj)
        } else {
            res.status(404).send('Not Found')
        }   
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})

app.post('/blog/post', async (req, res) => {
    try {

        if (req.body.hasOwnProperty('title') &&
            req.body.hasOwnProperty('content') &&
            typeof req.body.title === 'string'&&
            typeof req.body.content === 'string'
            ) {
            let blogPost = {
                title: req.body.title,
                content: req.body.content
            }

            let newPost = await db.posts.insert(blogPost)
            res.status(201).send('Created')
        } else {
            res.status(400).send('Bad Request')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})

app.post('/blog/comment/post', async (req, res) => {
    try {
        if (req.body.hasOwnProperty('blogPostId') &&
            req.body.hasOwnProperty('name') &&
            req.body.hasOwnProperty('comment') &&
            typeof req.body.blogPostId === 'string'&&
            typeof req.body.name === 'string' &&
            typeof req.body.comment === 'string'
            ) {
                let comment = {
                    blogPostId: req.body.blogPostId,
                    name: req.body.name,
                    comment: req.body.comment
                }

                let newComment = await db.comments.insert(comment)

                res.status(201).send('Created')
            } else {
                res.status(400).send('Bad Request')
            }
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})

app.put('/blog/put/:id', async (req, res) => {
    try {

        if (req.body.hasOwnProperty('title') &&
            req.body.hasOwnProperty('content') &&
            typeof req.body.title === 'string'&&
            typeof req.body.content === 'string'
            ) {

            let updatedPost = {
                title: req.body.title,
                content: req.body.content
            }
            
            let updPost = await db.posts.update({ _id: req.params.id }, updatedPost)

            if (updPost !== 0) {
                res.status(200).send('OK')
            } else {
                res.status(404).send('Not Found')
            }
        } else {
            res.status(400).send('Bad Request')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})

app.delete('/blog/delete/:id', async (req, res) => {
    try {
        let delPost = await db.posts.remove({ _id: req.params.id })
    
        if (delPost !== 0) {
            res.status(200).send('OK')
        } else {
            res.status(404).send('Not Found')
        } 
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
