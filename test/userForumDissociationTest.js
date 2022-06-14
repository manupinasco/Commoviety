const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('User and Forum dissociation', () => {

    it('Returns 201 if User and Forum are dissociated', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:4444/usersForumsDissociation',
            data: {idUser: 2, idForum: 2}
        }
        
        ).then((response) => {
            assert.equal(response.status, 201)
            done()
        })
        .catch((err) => {
            assert.equal(err.status, 201)
            done()
        })
    })

   it("Returns 422 if User isn't associated", (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/usersForumsDissociation',
            data: {idUser: 11, idForum: 5}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'UNASSOCIATED_USER')
            done()
        })
    })

})