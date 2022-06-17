const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('Message reporting', () => {
    
    let idUser
    let idMessage

    before(async () => {
        let createForum = async function () {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/forums',
            })
            .then((response) => {
                    idForum = response.data.idForum
            })
        }

        let createUser = async function () {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/users',
                data: { nickname: 'Clark' }
            })
            .then((response) => {
                    idUser = response.data.idUser
            })
        }

        let associateUserForum = async function () { 
            return axios({
            method: 'post',
            url: 'http://localhost:4444/usersForums',
            data: { idUser: idUser, idForum: idForum }
        })}

        let sendMessage = async function () {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/messagesForums',
                data: { idForum: idForum, idUser: idUser }
            }).then((response) => {
                idMessage = response.data.idMessage
            })
        } 

        return Promise.all([createForum, createUser].map(fn => fn())).then(associateUserForum).then(sendMessage)
    })

    it('Returns 201 if the message is reported correctly', () => {
        return axios({
            method: 'put',
            url: 'http://localhost:4444/messageReport',
            data: {idMessage: idMessage}
        }
        ).then((response) => {
            assert.equal(response.status, 201)
        })
    }) 


    it("Returns 422 if message hasn't been reported because the message has already 3 reports", async () => {
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
        .then( () => {
            return axios({
            method: 'put',
            url: 'http://localhost:4444/messageReport',
            data: {idMessage: idMessage}
            })
            .catch(err => {
                assert.equal(err.response.data.message, 'MANY_TIMES_REPORTED_MESSAGE')
            })
        })
    })

    it("Returns 422 if message hasn't been reported because it doesn't exists", async () => {
        return axios({
            method: 'put',
            url: 'http://localhost:4444/messageReport',
            data: {idMessage: 1000000000000000}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'MESSAGE_DOESNT_EXIST')
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