const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const { assert } = chai;

describe('Message sending in forum', () => {
    let idForum
    let idUser
    before(() => {
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
                data: { nickname: 'Albert' }
            })
                .then((response) => {
                    idUser = response.data.idUser
                })
        }

        return Promise.all([createForum, createUser].map(fn => fn()))
    })

    it("Returns 422 if the message hasn't been sent because the user and forum association doesn't exist", async () => {
        return axios({
            method: 'post',
            url: 'http://localhost:4444/messagesForums',
            data: { idForum: idForum, idUser: idUser }
        })
            .catch(err => {
                assert.equal(err.response.data.message, 'USERFORUM_DOESNT_EXISTS')
            })
    })

    it("Returns 201 if the message is sent to the forum correctly", () => {

        return axios({
            method: 'post',
            url: 'http://localhost:4444/usersForums',
            data: { idUser: idUser, idForum: idForum }
        }).then(() => {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/messagesForums',
                data: { idForum: idForum, idUser: idUser }
            })
            .then((response) => {
                assert.equal(response.status, 201)
            })
        })
    })

    it("Returns 422 if the message hasn't been sent because the user is in the forum but has more than 4 reports", async () => {
         return axios({
             method: 'put',
             url: 'http://localhost:4444/banUser',
             data: {idUser: idUser}
         }).then(() => {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/messagesForums',
                data: { idForum: idForum, idUser: idUser }
            })
            .catch((err) => {
                assert.equal(err.response.data.message, 'BANNED_USER')
            })
        })
     })

    after(() => {

        let deleteForum = (async () => {
            return axios({
                method: 'delete',
                url: 'http://localhost:4444/forums',
                data: { id: idForum }

            })
        })

        let deleteUser = (async () => {
            return axios({
                method: 'delete',
                url: 'http://localhost:4444/users',
                data: { id: idUser }
            })
        })

        return axios({
            method: 'delete',
            url: 'http://localhost:4444/usersForums',
            data: { idUser: idUser, idForum: idForum }
        })
        .then(() => { return Promise.all([deleteForum, deleteUser].map(fn => fn())) })
    })
})

