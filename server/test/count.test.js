const chai = require('chai')
chai.should()

const {count, getAllPosts} = require('../models/post')

describe('Count number of documents', () => {
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
