const chai = require('chai')
chai.should()
const bcrypt = require('bcryptjs')
const db = require('../database/dbSetup')

const userModel = require('../models/user')
const postModel = require('../models/post')
const commentModel = require('../models/comment')

describe('Comment Model', () => {
    beforeEach(() => {
        db.db.dropDatabase((err, result) => {})
    })
    it('should return the number of comments in the db', async () => {
        // Arrange
        const user = await userModel.addUser({username: 'TestUser1', password: bcrypt.hashSync('123', 10), role: 'user'})

        let blogPost = {
            title: 'TestPost',
            content: 'TestContent',
            userId: user._id
        }

        const post = await postModel.addPost(blogPost)

        let comment = {
            text: 'TestText',
            postId: post._id,
            userId: user._id
        }

        await commentModel.addComment(comment)
        await commentModel.addComment(comment)
        await commentModel.addComment(comment)
        await commentModel.addComment(comment)

        // Act
        const numberOfComments = await commentModel.count({})

        // Assert
        numberOfComments.should.be.a('number')
        numberOfComments.should.equal(4)
    })
    
    it('should return the comment owners user document from db', async () => {
        // Arrange
        const user = await userModel.addUser({username: 'TestUser1', password: bcrypt.hashSync('123', 10), role: 'user'})

        let blogPost = {
            title: 'TestPost',
            content: 'TestContent',
            userId: user._id
        }

        const post = await postModel.addPost(blogPost)

        let commentObject = {
            text: 'TestText',
            postId: post._id,
            userId: user._id
        }

        const comment = await commentModel.addComment(commentObject)
        
        // Act
        const owner = await userModel.getCommentOwner(comment)
        console.log(owner)
        // Assert
        owner.should.be.an('object')
        owner._id.toString().should.equal(comment.userId)
    })

    
    it('should return all comments that match the search query', async () => {
        // Arrange
        const user = await userModel.addUser({username: 'TestUser1', password: bcrypt.hashSync('123', 10), role: 'user'})

        let blogPost = {
            title: 'TestPost',
            content: 'TestContent',
            userId: user._id
        }

        const post = await postModel.addPost(blogPost)

        let commentObject = {
            text: 'TestText',
            postId: post._id,
            userId: user._id
        }

        let commentObject2 = {
            text: 'adflkjhagdf',
            postId: post._id,
            userId: user._id
        }

        await commentModel.addComment(commentObject)
        await commentModel.addComment(commentObject)
        await commentModel.addComment(commentObject2)
        await commentModel.addComment(commentObject2)

        const text = 'test'
        const regex = new RegExp(text, 'i')
        
        // Act
        const comments = await commentModel.search(regex)

        // Assert
        comments.should.be.an('array')
        comments.length.should.equal(2)
        for (const comment of comments) {
            comment.should.have.property('text')
            comment.text.should.match(regex)
        }
    })
})
