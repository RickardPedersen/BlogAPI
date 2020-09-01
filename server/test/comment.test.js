const chai = require('chai')
chai.should()

// user model
const {
    getCommentOwner
} = require('../models/user')

// comment model
const {
    count,
    getComment,
    getAllComments,
    search
} = require('../models/comment')

describe('Count number of comments', () => {
    it('should return the number of comments in the db', async () => {
        // Arrange
        const comments = await getAllComments({})

        // Act
        const numberOfComments = await count({})

        // Assert
        numberOfComments.should.be.a('number')
        numberOfComments.should.equal(comments.length)
    })
})

describe('Find comment owner', () => {
    it('should return the comment owners user document from db', async () => {
        // Arrange
        const comment = await getComment('5f46610d03b4fb5e38819c1f')
        
        // Act
        const owner = await getCommentOwner(comment)

        // Assert
        owner._id.toString().should.equal(comment.userId)
    })
})

describe('Search comments', () => {
    it('should return all comments that match the search query', async () => {
        // Arrange
        const text = 'bra'
        const regex = new RegExp(text, 'i')
        const searchQuery = { text: regex }
        
        // Act
        const comments = await search(searchQuery)

        // Assert
        comments.should.be.an('array')
        for (const comment of comments) {
            comment.should.have.property('text')
            comment.text.should.match(regex)
        }
    })
})
