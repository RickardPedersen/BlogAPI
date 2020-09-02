const mongoose = require('mongoose')
require('dotenv').config()

switch(process.env.ENVIRONMENT) {
    case 'test':
        mongoose.connect('mongodb://localhost:27017/BlogDBTest', { useNewUrlParser: true, useUnifiedTopology: true })
    break;
    case 'development':
        mongoose.connect('mongodb://localhost:27017/BlogDB', { useNewUrlParser: true, useUnifiedTopology: true })
    break;
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to db')
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
)

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
)

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
)

const user = mongoose.model('user', userSchema)
const post = mongoose.model('post', postSchema)
const comment = mongoose.model('comment', commentSchema)

module.exports = {user, post, comment}



/*
const Datastore = require('nedb-promises')
let db = {}
db.posts = Datastore.create('server/database/posts')
db.comments = Datastore.create('server/database/comments')
db.posts.load()
db.comments.load()

module.exports = db*/