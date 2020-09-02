const chai = require('chai')
chai.should()
const bcrypt = require('bcryptjs')
const {connect, disconnect} = require('../database/dbSetup')

const userModel = require('../models/user')
const postModel = require('../models/post')
//const commentModel = require('../models/comment')

describe('Post Model', () => {
    before(async () => {
        await connect()
    })

    beforeEach(async () => {
        await postModel.clear()
    })

    it('should return the number of posts in the db', async () => {
        // Arrange
        const user = await userModel.addUser({username: 'TestUser1', password: bcrypt.hashSync('123', 10), role: 'user'})

        let blogPost = {
            title: 'TestPost',
            content: 'TestContent',
            userId: user._id
        }

        await postModel.addPost(blogPost)
        await postModel.addPost(blogPost)
        await postModel.addPost(blogPost)
        await postModel.addPost(blogPost)
        await postModel.addPost(blogPost)

        //const posts = await getAllPosts({})

        // Act
        const numberOfPosts = await postModel.count({})

        // Assert
        numberOfPosts.should.be.a('number')
        numberOfPosts.should.equal(5)
    })

    
    it('should return the post owners user document from db', async () => {
        // Arrange
        const user = await userModel.addUser({username: 'TestUser1', password: bcrypt.hashSync('123', 10), role: 'user'})

        let blogPost = {
            title: 'TestPost',
            content: 'TestContent',
            userId: user._id
        }

        const post = await postModel.addPost(blogPost)
        
        // Act
        const owner = await userModel.getPostOwner(post)

        // Assert
        owner._id.toString().should.equal(post.userId)
    })

    it('should return all posts that match the search query', async () => {
        // Arrange
        const user = await userModel.addUser({username: 'TestUser1', password: bcrypt.hashSync('123', 10), role: 'user'})

        let blogPost = {
            title: 'TestPost',
            content: 'TestContent',
            userId: user._id
        }
        let blogPost2 = {
            title: 'blabla',
            content: 'asdkjfhgk',
            userId: user._id
        }
        let blogPost3 = {
            title: 'asdfasdf',
            content: 'TestContent',
            userId: user._id
        }
        let blogPost4 = {
            title: 'Testar',
            content: 'sdfgsfdgsdfg',
            userId: user._id
        }

        await postModel.addPost(blogPost)
        await postModel.addPost(blogPost3)
        await postModel.addPost(blogPost4)
        await postModel.addPost(blogPost2)
        await postModel.addPost(blogPost2)

        const text = 'test'
        const regex = new RegExp(text, 'i')
        
        // Act
        const posts = await postModel.search(regex)

        // Assert
        posts.should.be.an('array')
        posts.length.should.equal(3)
        for (const post of posts) {
            post.should.have.property('title')
            post.should.have.property('content')
            post.should.satisfy(() => { return regex.test(post.title) || regex.test(post.content) })
        }
    })

    after(() => {
        disconnect()
    })
})
