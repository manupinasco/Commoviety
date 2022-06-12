const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('ListCreation', () => {

    it('Returns 201 if the List is created and added to the User', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:4444/list',
            data: {idUser: 3, nameList: 'Action'}
            
        }
        
        ).then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

   it('Returns 422 if the name of the List is empty', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/list',
            data: {idUser: 3, nameList: ''}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'EMPTY_NAME')
            done()
        })
    })

    it('Returns 422 if the name of the List is not allowed', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/list',
            data: {idUser: 3, nameList: 'MoviesWatched'}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'NAME_NOT_ALLOWED')
            done()
        })
    })

    it('Returns 422 if the name of the List is not allowed', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/list',
            data: {idUser: 3, nameList: 'Action'}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'NAME_ALREADY_IN_USE')
            done()
        })
    })



})