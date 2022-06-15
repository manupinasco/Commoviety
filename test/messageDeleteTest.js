const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const { assert } = chai;


describe('Message deleting', () => {

    let idUser
    let idMessage

    before(async () => {
        return axios({
            method: 'post',
            url: 'http://localhost:4444/users',
            data: { nickname: 'Mike' }
        })
        .then((response) => {
            idUser = response.data.idUser
            return axios({
                method: 'post',
                url: 'http://localhost:4444/messages',
                data: {idUser: idUser}
            })
            .then((response) => {
                idMessage = response.data.idMessage
            })
        })
    })

    it("Returns 422 if message hasn't been deleted because the message has less than 3 reports", async () => {
            return axios({
                method: 'delete',
                url: 'http://localhost:4444/message',
                data: {idMessage: idMessage}
            })
            .catch(err => {
                assert.equal(err.response.data.message, 'FEW_REPORTS_IN_MESSAGE')
            })
    }) 

    it("Returns 422 if message hasn't been deleted because the message has more than 2 reports but the user has less than 5 reports", async () => {
        
        return axios({
            method : 'put',
            url: 'http://localhost:4444/messageReport',
            data: {idMessage: idMessage}
        })
        .then(() => {return axios({
            method : 'put',
            url: 'http://localhost:4444/messageReport',
            data: {idMessage: idMessage}
        })})
        .then(() => {return axios({
            method : 'put',
            url: 'http://localhost:4444/messageReport',
            data: {idMessage: idMessage}
        })})
        .then( () => {
            return axios({
            method: 'delete',
            url: 'http://localhost:4444/message',
            data: {idMessage: idMessage}
            })
            .catch(err => {
                assert.equal(err.response.data.message, 'NOT_BANNED_USER')
            })
        })
    })

    it("Returns 201 if the message is deleted", async () => {
        return axios({
            method: 'put',
            url: 'http://localhost:4444/banUser',
            data: {idUser: idUser}
        })
        .then(() => {
            return axios({
            method: 'delete',
            url: 'http://localhost:4444/message',
            data: {idMessage: idMessage}
            })
            .then(response => {
                assert.equal(response.status,201)
            })
        })
    })

    after(() => {
        return axios({
            method : 'delete',
            url: 'http://localhost:4444/users',
            data: {id: idUser}
        })
    })
})