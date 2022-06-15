const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('UserForumAssociation', () => {

    let idUser
    let idForum
    before('Create User and Forum', () => {
        let createForum = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/forums',
                data: {}
               
            }).then((response) => {
                idForum = response.data.idForum
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
        }
        let createUser = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/users',
                data: {nickname: 'Charlie'}
               
            }).then((response) => {
                idUser = response.data.idUser
                assert.equal(response.status, 201)
            }).catch( (err) => {
                assert.equal(err.response.status, 201)
            })
        }

        return Promise.all([createForum, createUser].map(fn => fn()))
    })


    it('Returns 201 if User and Forum are saved', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:4444/usersForums',
            data: {idUser: idUser, idForum: idForum}
            
        }
        
        ).then((response) => {
            assert.equal(response.status, 201)
            done()
        }).catch((err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    })

   it('Returns 422 if UserForum exist', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/usersForums',
            data: {idUser: idUser, idForum: idForum}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'USERFORUM_EXISTS')
            done()
        })
    })

    after('Delete UserForum, User and Forum', () => {

        let deleteAssociation = async() => { 
            return axios({
            method: 'delete',
            url: 'http://localhost:4444/usersForums',
            data: {idUser: idUser, idForum: idForum}
        }).then((response) => {
            assert.equal(response.status, 201)
        }).catch((err) => {
            assert.equal(err.response.status, 201)
        })
    }
        async function deleteForum() {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/forums',
                data: {id: idForum}
               
            }).then((response) => {
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
           
           
           
        }
        async function deleteUser() {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/users',
                data: {id: idUser}
               
            }).then((response) => {
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
        }

        

    return Promise.all([deleteAssociation].map(fn => fn())).then(deleteForum).then(deleteUser)
 
    })


})