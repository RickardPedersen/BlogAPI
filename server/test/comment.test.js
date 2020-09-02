// const chai = require('chai')
// chai.should()

// // user model
// const {
//     getCommentOwner,
//     getUser
// } = require('../models/user')

// // comment model
// const {
//     count,
//     getComment,
//     getAllComments,
//     search,
//     clearAllComments,
//     addComment
// } = require('../models/comment')
// const { connect } = require('mongoose')

// describe('Count number of comments', () => {
//     beforeEach(async () => {
//         await clearAllComments()
//     })
    
//     it('should return the number of comments in the db', async () => {
//         // Arrange
//         const user = await getUser({username: 'Amanda'})
//         const firstComment = {
//             text: 'firstposttotest123123',
//             postId: '5f4f5e2d1c3d0d17341f78c1',
//             userId: user._id
//         }
//         const secondComment = {
//             text: 'haha',
//             postId: '5f4f5e2d1c3d0d17341f78c1',
//             userId: user._id
//         }

//         // Act
//         const sucess = await addComment(firstComment)
//         const sucess2 = await addComment(secondComment)
//         const comments = await getAllComments({})
//         const numberOfComments = await count({})
        
//         // Assert
//         numberOfComments.should.be.a('number')
//         numberOfComments.should.equal(comments.length)
//     })
// })

// describe('Find comment owner', () => {
//     it('should return the comment owners user document from db', async () => {
//         // Arrange
//         const user = await getUser({username: 'Amanda'})
//         const firstComment = {
//             text: 'hej',
//             postId: '5f4f5e2d1c3d0d17341f78c1',
//             userId: user._id
//         }
    
//         // Act
//         const result = await addComment(firstComment)
//         const comment = await getComment(result._id)
//         const owner = await getCommentOwner(comment)

//         // Assert
//         owner._id.toString().should.equal(comment.userId)
//     })
// })

// describe('Search comments', () => {
//     it('should return all comments that match the search query', async () => {
//         // Arrange
//         const text = 'hej'
//         const regex = new RegExp(text, 'i')
        
//         // Act
//         const comments = await search(regex)

//         // Assert
//         comments.should.be.an('array')
//         for (const comment of comments) {
//             comment.should.have.property('text')
//             comment.text.should.match(regex)
//         }
//     })
// })

// describe('Comment text type check', () => {
//     it('Should be a string', async () => {
//         // Arrange
//         const user = await getUser({username: 'Amanda'})
//         const thirdComment = {
//             text: 'hejhej',
//             postId: '5f4f5e2d1c3d0d17341f78c1',
//             userId: user._id
//         }
    
//         // Act
//         const result = await addComment(thirdComment)
//         const commentID = result._id
//         const comment = await getComment(commentID)

//         // Assert
//         comment.text.should.be.a('string')

//     })
//     it('Should be a string and not a number :D', async () => {  
//         // Arrange

//         // Act
//         const allComments = await getAllComments({})

//         // Assert
//         allComments.forEach(comment => {
//             comment.text.should.be.a('string')
//             comment.text.should.not.be.a('number')
//         });
//     })
// })