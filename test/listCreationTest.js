const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;

describe('ListCreation', () => {
    let idUser
    let idList


    before('Create User', () => {
        return axios({
                method : 'post',
                url: 'http://localhost:4444/users',
                data: {nickname: 'Charlie'}
                
            }).then((response) => {
                idUser = response.data.idUser
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 201)
            })
    })

    it('Returns 201 if the List is created and added to the User', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:4444/lists',
            data: {idUser: idUser, nameList: 'ActionMoviesTop'}
            
        }
        
        ).then((response) => {
            idList = response.data.idList
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    })

   it('Returns 422 if the name of the List is empty', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/lists',
            data: {idUser: idUser, nameList: ''}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'EMPTY_NAME')
            done()
        })
    })

    it('Returns 422 if the name of the List is not allowed', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/lists',
            data: {idUser: idUser, nameList: 'MoviesWatched'}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'NAME_NOT_ALLOWED')
            done()
        })
    })

    it('Returns 422 if the name of the List is not allowed', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/lists',
            data: {idUser: idUser, nameList: 'ActionMoviesTop'}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'NAME_ALREADY_IN_USE')
            done()
        })
        
    })

    after('Delete User and List', () => {
        let deleteList = async () => {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/lists',
                data: {id: idList}
                
            }).then((response) => {
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 201)
            })
            
            
            
        }
        async function deleteUser() {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/users',
                data: {id: idUser}
                
            }).then((response) => {
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 201)
            })
        }
        
        return Promise.all([deleteList].map(fn => fn())).then(deleteUser)

        
    })

})