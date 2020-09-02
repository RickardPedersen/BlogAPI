const chai = require('chai')
chai.should()

const {
    addUser
} = require('../models/user')

describe('Add user', () => {
    beforeEach(async () => {
        await clearAllUsers()
    })
    
    it('should create new user to testdb', async () => {
        const firstUser = {
            username: "Amanda",
            password: "Amanda",
            role: "member"
        }
        const result = await addUser(firstUser)
    })
})

describe('Searching for users', () => {

    it('Should find all the users with "A" as a first letter', async () => {

        //Arrange
        const searchText = 'A'
        const regex = new RegExp(searchText, 'i')

        //Act
        const users = await searchUsers(regex)

        //Assert
        users.should.be.an('array')

        for (const user of users) {
            user.should.have.property('username')
            user.should.satisfy(() => { return regex.test(user.username) })
        }
    })
})
