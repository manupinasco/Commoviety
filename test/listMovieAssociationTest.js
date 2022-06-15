const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('ListMovieAssociation', () => {

    it('Returns 201 if List and Movie are associated correctly', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:4444/listMovie',
            data: {idList: 98, idMovie: 5}
            
        }
        
        ).then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

   it('Returns 422 if ListMovie exists', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/listMovie',
            data: {idList: 98, idMovie: 5}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'LISTMOVIE_ALREADY_EXISTS')
            done()
        })
    })

    after('Delete ListMovie', (done) => {
        axios({
            method: 'delete',
            url: 'http://localhost:4444/listMovie',
            data: {idList: 98, idMovie: 5}
        })
        done()
 
    })


})