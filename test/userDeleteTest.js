const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('UserDelete', () => {

    let idUser

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

    it('Returns 201 if the User is deleted', (done) => {

        axios({
            method: 'delete',
            url: 'http://localhost:4444/user',
            data: {idUser: idUser}
            
        }
        
        ).then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }).catch((err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    })

})