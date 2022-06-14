const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('User and Forum association', () => {


    it('Returns 201 if User and Forum are saved', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:4444/usersForums',
            data: {idUser: 7, idForum: 7}
            
        }
        
        ).then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(true, (assert.equal(err.response.status, 422) || assert.equal(err.response.status, 403)))
            done()
        })
    })

   it('Returns 422 if UserForum exist', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/usersForums',
            data: {idUser: 7, idForum: 7}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'USERFORUM_EXISTS')
            done()
        })
    })

    after('Delete UserForum', (done) => {
        axios({
            method: 'delete',
            url: 'http://localhost:4444/usersForums',
            data: {idUser: 7, idForum: 7}
        })
        done()
 
    })


})