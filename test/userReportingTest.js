const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('User reporting', () => {
    
    let idUser

    before(() => {
        return axios({
            method : 'post',
            url: 'http://localhost:4444/users',
            data: {nickname: 'Carl'}
           
        }).then((response) => {
            idUser = response.data.idUser 
        })
    })

    it('Returns 201 if the user is reported correctly', (done) => {
        axios({
            method: 'put',
            url: 'http://localhost:4444/userReport',
            data: {idUser: idUser}
            
        }
        ).then((response) => {
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    }) 

    it("Returns 422 if user hasn't been reported because it doesn't exists", (done) => {
        axios({
            method: 'put',
            url: 'http://localhost:4444/userReport',
            data: {idUser: 1000000000000000}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'USER_DOESNT_EXIST')
            done()
        })
    })

    it("Returns 422 if user hasn't been reported because it has already 5 reports", async () => {
        //Agrego 5 denuncias al usuario y trato de volver a denunciarlo
        return axios({
            method: 'put',
            url: 'http://localhost:4444/banUser',
            data: {idUser: idUser}
        })
        .then(() => {
            return axios({
                method: 'put',
                url: 'http://localhost:4444/userReport',
                data: {idUser: idUser}
            })
            .catch(err => {
                assert.equal(err.response.data.message, 'MANY_TIMES_REPORTED_USER')
        })})
    })

    after(() => {
        return axios({
            method : 'delete',
            url: 'http://localhost:4444/users',
            data: {id: idUser}
        })
    })
})