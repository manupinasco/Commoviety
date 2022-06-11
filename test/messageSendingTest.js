const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('Message sending in forum', () => {

    it('Returns 201 if the message is sent to the forum correctly', (done) => {
        axios({
            method: 'post',
            url: 'http://localhost:4444/messageForum',
            data: {idMessage: 2, idForum: 2}
            
        }
        ).then((response) => {
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    })


})