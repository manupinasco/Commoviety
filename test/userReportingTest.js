const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('User reporting', () => {
    
    /* FALTA BEFORE ASYNC PARA HACER LAS DEMAS PRUEBAS */
    
    /* before((done) => {
       
    }) */

    it('Returns 201 if the user is reported correctly', (done) => {
        axios({
            method: 'put',
            url: 'http://localhost:4444/userReport',
            data: {idUser: 5}
            
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
            data: {idMessage: 1000000000000000}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'USER_DOESNT_EXIST')
            done()
        })
    })

    /* it("Returns 422 if user hasn't been reported because it has already 5 reports", (done) => {
        axios({
            method: 'put',
            url: 'http://localhost:4444/userReport',
            data: {idMessage: 8}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'MANY_TIMES_REPORTED_USER')
            done()
        })
    }) */


})