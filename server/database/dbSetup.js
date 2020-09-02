require('dotenv').config()
const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(`mongodb://localhost:27017/BlogDB_${process.env.ENVIRONMENT}`, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (error) {
        console.log(error)
    }
}

function disconnect() {
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed')
    })
}

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', function() {
  console.log(`Connected to ${process.env.ENVIRONMENT} db`)
})

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

module.exports = {user, post, comment, connect, disconnect}
