const chai = require('chai')
const axios = require('axios')
const chaiFetch = require('chai-fetch')
chai.use(chaiFetch)
const { assert } = chai

describe('UserSearching', () => {
    let idUser

    before('Create User', () => {
        return axios({
                method : 'post',
                url: 'http://localhost:4444/users',
                data: {nickname: 'Martino'}
                
            }).then((response) => {
                idUser = response.data.idUser
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
    })

    it("Finds a user if an existing user's name starts with the sent field or is equal to the sent field", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/users?name=martino',
        }).then(response => {
            assert.equal(response.data[0].nickname, "Martino")
            done()
        }).catch((err) => {
            console.log(err)
            assert.equal(err.response.status, 201)
        })
    })

    it("Finds a user if an existing user's name starts with the sent field and the field has more than 2 characters", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/users?name=mar'
        }).then(response => {
            assert(response.data[0].nickname.startsWith('Mar'))
            done()
        })
    })

    it("Doesn't find any user if the field has less than 3 characters", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/users?name=ma',
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

    after('Delete User', () => {
        return axios({
                method : 'delete',
                url: 'http://localhost:4444/users',
                data: {id: idUser}
                
            })
    })
})