const chai = require('chai')
chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {expect, request} = chai
const app = require('../server')

const bcrypt = require('bcryptjs')
const TestDB = require('../database/dbSetup')

const userModel = require('../models/user')
const postModel = require('../models/post')

describe('Posts integration test', () => {
    beforeEach(async function() {
        await TestDB.db.dropDatabase((err, result) => {})
        const user = await userModel.addUser({
            username: 'TestUser1',
            password: bcrypt.hashSync('123', 10),
            role: 'user'
        })
        this.currentTest.userId = user._id
        const result = await userModel.authenticate(user.username, '123') 
        this.currentTest.token = result.token
    })

    it('should create post', function() {
        const fields = {title: 'TITEL', content: 'CONTENT'}
        request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${this.test.token}`)
            .set('Content-Type', 'application/json')
            .send(fields)
            .end((err, res) => {
                expect(res).to.have.status(201)
                expect(res).to.be.json
                res.body.should.have.keys(['__v', '_id', 'title', 'content', 'userId', 'createdAt', 'updatedAt'])
            })
    })

    it('should return posts matching search query', async function() {
        // Arrange
        let blogPost = {
            title: 'TestPost',
            content: 'TestContent',
            userId: this.test.userId
        }

        let blogPost1 = {
            title: 'alkjsdfhlaskdfj',
            content: 'asdasdasd',
            userId: this.test.userId
        }

        await postModel.addPost(blogPost)
        await postModel.addPost(blogPost)
        await postModel.addPost(blogPost)
        await postModel.addPost(blogPost1)
        await postModel.addPost(blogPost1)
        await postModel.addPost(blogPost1)
        await postModel.addPost(blogPost1)

        const searchText = 'test'
        const regex = new RegExp(searchText, 'i')

        // Act
        request(app)
            .get(`/posts/search?query=${searchText}`)
            .set('Authorization', `Bearer ${this.test.token}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {

                // Assert
                res.should.have.status(200)
                res.should.be.json
                res.body.should.be.an('array')
                res.body.length.should.equal(3)

                for (const post of res.body) {
                    post.should.have.keys(['__v', '_id', 'title', 'content', 'userId', 'createdAt', 'updatedAt'])
                    post.should.satisfy(() => { return regex.test(post.title) || regex.test(post.content) })
                }
            })
    })
})
