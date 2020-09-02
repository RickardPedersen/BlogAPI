require('dotenv').config()

let databaseName = 'BlogDB'

switch(process.env.ENVIRONMENT) {
    case 'dev':
        databaseName = 'BlogDB_dev'
        break;
    
    case 'test':
        databaseName = 'BlogDB_test'
        break;

    case 'prod':
        databaseName = 'BlogDB_test'
        break;

    default:
        databaseName = 'BlogDB'
}
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true })

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

module.exports = {db, user, post, comment}



/*
const Datastore = require('nedb-promises')
let db = {}
db.posts = Datastore.create('server/database/posts')
db.comments = Datastore.create('server/database/comments')
db.posts.load()
db.comments.load()

module.exports = db*/