require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect

chai.use(chaiHttp)


describe('/POST /add-user', () => {
    it("Should create new user data", () => {
        chai.request(app)
        .post('/users/add-user')
        .send({
           "first_name": "Alice",
            "last_name": "Bob",
            "password": "supersecurepassword",
            "email": "alice@bob.com",
            "country": "UK",
        })
        .end((err, res) => {
            expect(res.status).to.be(201)
            expect(res).to.be.an('object')
        })
    })
})


describe('/PUT modify-user', () => {
    it("should modify existing user data", () => {
        chai.request(app)
        .put('/users/modify-user/667ec3a541dd82deb240f5ej')
        .send({
            "first_name": "Alice",
            "last_name": "Bob",
            "password": "supersecurepassword",
            "email": "alice@bob.com",
            "country": "UK",
        })
        .end((err, res) => {
            expect(res.status).to.be(200)
            expect(res).to.be.an('object')
        })
    })
})

describe('/DELETE remove-user', () => {
    it("Should delete user data", () => {
        chai.request(app)
        .delete('/users/remove-user/667ec3a541dd82deb240f5ej')
        .end((err, res) => {
            expect(res.status).to.be(200)
        })
    })
})

describe('/GET get-users', () => {
    it("should return a paginated list of users that can be filtered by country", () => {
        chai.request(app)
        .get('/users/get-users/country?')
        .end((err, res) => {
            expect(res.status).to.be(200)
            expect(res).to.be.an('object')
        })
    })
})