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
            data: {idUser: 2, idForum: 2}
            
        }
        
        ).then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

   it('Returns 422 if UserForum exist', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/usersForums',
            data: {idUser: 2, idForum: 2}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'USERFORUM_EXISTS')
            done()
        })
    })

})