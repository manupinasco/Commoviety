const chai = require('chai')
const axios = require('axios')
const chaiFetch = require('chai-fetch')
chai.use(chaiFetch)
const { assert } = chai

describe('User seaching by name', () => {
    before((done) => {
        axios({
            method: 'post',
            url: 'http://localhost:4444/users',
            data: {name: 'Dmitriy.Meißner'}
            
        })
        .then(response => {
            done()
        })
        .catch(err => {
            done()
        })
    })

    after((done) => {
        axios({
            method: 'delete',
            url: 'http://localhost:4444/users',
            data: {name: 'Dmitriy.Meißner'}
        })
        .then(response => {
            done()
        })
        .catch(err => {
            done()
        })
    })

    it("Finds a user if an existing user's name starts with the sent field or is equal to the sent field", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/users?name=Dmitriy.Meißner',
        }).then(response => {
            assert(response.data[0].name.startsWith('Dmitriy.Meißner'))
            done()
        })
    })

    it("Finds a user if an existing user's name starts with the sent field and the field has more than 2 characters", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/users?name=dmi'
        }).then(response => {
            assert(response.data[0].name.startsWith('Dmi'))
            done()
        })
    })

    it("Doesn't find any user if the field has less than 3 characters", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/users?name=dm',
        }).then(response => {
            assert.equal(response.data.length, 0)
            done()
        })
    })

    it("Doesn't find any user if none of the existing user's names start with the sent field and none are not equal to it", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/users?name=sfsdsfsf',
        }).then(response => {
            assert.equal(response.data.length, 0)
            done()
        })
    })
})