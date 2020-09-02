const app = require('../server')
const bcrypt = require('bcryptjs')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request} = chai
chai.should()
const db = require('../database/dbSetup')

const authenticationModel = require('../models/authentication')
const user = require('../models/user')

describe('My RESTful Resource', () => {
	before(async () => {
		await db.connect()
		await user.clearAllUsers()
		function hashPassword(password) {
			return bcrypt.hashSync(password, 10)
		}
		let aPassword = "grillkorv123"
		const newUser = await user.addUser({
			username: "test@test.test",
			password: hashPassword(aPassword),
			role: "member"
		})
	})
		// Arrange
	beforeEach(async function () {
		const newMember = await user.getUser({username: 'test@test.test'})
	
		this.currentTest.token = await authenticationModel.login({"username": newMember.username,"password": 'grillkorv123'})
		this.currentTest.userID = newMember.id
		
	})
	 it('should search for posts with a text', function() {	 
	 	request(app)
		 .get(`/posts/search?searchText=bra`)
		 .set('Authorization', `Bearer ${this.test.token}`)
	 	.end((err, res) => {
			 console.log('hello')
	 		expect(res).to.have.status(200)
	 	})
	 })
})