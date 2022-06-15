const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const { assert } = chai;


describe('User and Forum dissociation', () => {

    it('Returns 201 if User and Forum are dissociated', async () => {
        let idUser
        let idForum

        let createForum = async () => {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/forums',
                data: {}

            }).then((response) => {
                idForum = response.data.idForum
            })
        }

        let createUser = async () => {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/users',
                data: { nickname: 'Charlie' }

            }).then((response) => {
                idUser = response.data.idUser
            })
        }

        let asociationUserForum = Promise.all([createForum, createUser].map(fn => fn())).then(async () => {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/usersForums',
                data: { idUser: idUser, idForum: idForum }
            })
        })

        return asociationUserForum.then(async () => {
            return axios({
                method: 'delete',
                url: 'http://localhost:4444/usersForums',
                data: { idUser: idUser, idForum: idForum }
            })
            .then((response)=>{
                assert.equal(response.status,201)
            })
        })
    })

    it("Returns 422 if User isn't associated", async () => {
        let idUser
        let idForum

        let createForum = async () => {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/forums',
                data: {}

            }).then((response) => {
                idForum = response.data.idForum
            })
        }

        let createUser = async () => {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/users',
                data: { nickname: 'Charlie' }

            }).then((response) => {
                idUser = response.data.idUser
            })
        }

        return Promise.all([createForum, createUser].map(fn => fn())).then(async () => {
            return axios({
                method: 'delete',
                url: 'http://localhost:4444/usersForums',
                data: { idUser: idUser, idForum: idForum }
            })
            .catch(err => {
                assert.equal(err.response.data.message, 'UNASSOCIATED_USER')
            })
        })
    })
})