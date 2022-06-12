const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('Score creation', () => {

    it('Returns 201 if the Score is saved and associated', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:4444/scoreUser',
            data: {idUser: 3, idMovie: 2, value: 5}
            
        }
        
        ).then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

  it('Returns 201 if the value is updated', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/scoreUser',
            data: {idUser: 3, idMovie: 2, value: 2}
        })
        .then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('Returns 201 if the List is created and the Movie added', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/scoreUser',
            data: {idUser: 4, idMovie: 3, value: 2}
        })
        .then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    it('Returns 201 if the Movie added to the List', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/scoreUser',
            data: {idUser: 4, idMovie: 4, value: 2}
        })
        .then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

    

})