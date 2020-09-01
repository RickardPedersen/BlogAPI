const chai = require('chai')
chai.should()

// user model
const {
    getPostOwner
} = require('../models/user')

// post model
const {
    count,
    getPost,
    getAllPosts,
    search
} = require('../models/post')

describe('Count number of posts', () => {
    it('should return the number of posts in the db', async () => {
        // Arrange
        const posts = await getAllPosts({})

        // Act
        const numberOfPosts = await count({})

        // Assert
        numberOfPosts.should.be.a('number')
        numberOfPosts.should.equal(posts.length)
    })
})

describe('Find post owner', () => {
    it('should return the post owners user document from db', async () => {
        // Arrange
        const post = await getPost('5f465fd689c11c7da4aaf1bf')
        
        // Act
        const owner = await getPostOwner(post)

        // Assert
        owner._id.toString().should.equal(post.userId)
    })
})

describe('Search posts', () => {
    it('should return all posts that match the search query', async () => {
        // Arrange
        const text = 'bra'
        const regex = new RegExp(text, 'i')
        const searchQuery = {
            $or: [
                { title: regex },
                { content: regex }
            ]
        }
        
        // Act
        const posts = await search(searchQuery)

        // Assert
        posts.should.be.an('array')
        for (const post of posts) {
            post.should.have.property('title')
            post.should.have.property('content')
            post.should.satisfy(() => { return regex.test(post.title) || regex.test(post.content) })
        }
    })
})
