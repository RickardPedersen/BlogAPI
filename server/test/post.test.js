const chai = require('chai')
chai.should()

// user model
const {
    getPostOwner,
    getUser
} = require('../models/user')

// post model
const {
    count,
    getPost,
    getAllPosts,
    search,
    addPost,
    clearAllPosts
} = require('../models/post')

 // const post = require('../models/post')

describe('Count number of posts', () => {
    /**
     * Clear all data
     */
    beforeEach(async () => {
        await clearAllPosts()
    })
    

    it('should return the number of posts in the db', async () => {
        
        
        // Arrange
        const user = await getUser({username: 'Amanda'})
        const firstPost = {
            title: 'bra',
            content: 'firstcontenttotest123123',
            userId: user._id
        }

        // Act
        const sucess = await addPost(firstPost)
        const numberOfPosts = await count({})
        const posts = await getAllPosts({})

        // Assert
        numberOfPosts.should.be.a('number')
        numberOfPosts.should.equal(posts.length)
    })
})

describe('Find post owner', () => {
    it('should return the post owners user document from db', async () => {
        
        // Arrange
        const user = await getUser({username: 'Amanda'})
        const secondPost = {
            title: 'bra jobbat',
            content: 'firstcontenttotest123123',
            userId: user._id
        }

        // Act
        const result = await addPost(secondPost)
        const post = await getPost(result._id)
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
        
        // Act
        const posts = await search(regex)

        // Assert
        posts.should.be.an('array')
        for (const post of posts) {
            post.should.have.property('title')
            post.should.have.property('content')
            post.should.satisfy(() => { return regex.test(post.title) || regex.test(post.content) })
        }
    })
})


