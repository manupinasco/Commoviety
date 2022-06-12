const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('Message sending in forum', () => {
    before((done) => {
        axios({
            method: 'put',
            url: 'http://localhost:4444/banUser',
            data: { idMessage: 3 }
        })
        .then(()=>{
            done()
        })
        .catch(()=>{
            done()
        })
    })
    
    it("Returns 201 if the message is sent to the forum correctly", (done) => {
        axios({
            method: 'post',
            url: 'http://localhost:4444/messageForum',
            data: {idMessage: 2, idForum: 2}
            
        })
        .then(response => {
            assert.equal(response.status, 201)
            done()
        })
        .catch(err => {
            assert.equal(err.response.status, 201)
            done()
        })
    })
    it("Returns 422 if the message hasn't been sent because the user has more than 4 reports", (done) => {
        axios({
            method: 'post',
            url: 'http://localhost:4444/messageForum',
            data: {idMessage: 3, idForum: 2}
        })
        .then(response => {
            assert.equal(response.status, 201)
            done()
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'BANNED_USER')
            done()
        })
       
    }) 
})