const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('Message reporting', () => {
    
    /* FALTA BEFORE ASYNC PARA HACER LAS DEMAS PRUEBAS */
    
    /* before((done) => {
       
    }) */

    it('Returns 201 if the message is reported correctly', (done) => {
        axios({
            method: 'put',
            url: 'http://localhost:4444/messageReport',
            data: {idMessage: 5}
            
        }
        ).then((response) => {
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    }) 

    it("Returns 422 if message hasn't been reported because it doesn't exists", (done) => {
        axios({
            method: 'put',
            url: 'http://localhost:4444/messageReport',
            data: {idMessage: 1000000000000000}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'MESSAGE_DOESNT_EXIST')
            done()
        })
    })

    /* it("Returns 422 if message hasn't been reported because the message has already 3 reports", (done) => {
        axios({
            method: 'put',
            url: 'http://localhost:4444/messageReport',
            data: {idMessage: 8}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'MANY_TIMES_REPORTED_MESSAGE')
            done()
        })
    }) */


})