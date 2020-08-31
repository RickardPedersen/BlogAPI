const chai = require('chai')
chai.should()

const {getPostOwner} = require('../models/user')
const {getPost} = require('../models/post')

describe('Find post owner', () => {
    it('should return the user object for the post', async () => {
        // Arrange
        const post = await getPost('5f465fd689c11c7da4aaf1bf')
        
        // Act
        const owner = await getPostOwner(post)

        // Assert
        owner._id.toString().should.equal(post.userId)
    })
})
