const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('UserDelete', () => {

    it('Returns 201 if the User is deleted', (done) => {

        axios({
            method: 'delete',
            url: 'http://localhost:4444/user',
            data: {idUser: 10}
            
        }
        
        ).then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 422)
            done()
        })
    })

/*    it('Returns 422 if UserForum exist', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/user',
            data: {idUser: 10}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'USER_DOESNT_EXIST')
            done()
        })
    }) */

})