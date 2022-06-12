const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('Message', () => {
    
    /* FALTA BEFORE ASYNC PARA HACER LAS DEMAS PRUEBAS */
    
    /* before((done) => {
       
    }) */

    /* it('Returns 201 if the message is deleted', (done) => {
        axios({
            method: 'delete',
            url: 'http://localhost:4444/message',
            data: {idMessage: 8}
            
        }
        ).then((response) => {
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    }) */

    it("Returns 422 if message hasn't been deleted because the message has less than 3 reports", (done) => {
        axios({
            method: 'delete',
            url: 'http://localhost:4444/message',
            data: {idMessage: 8}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'FEW_REPORTS_IN_MESSAGE')
            done()
        })
    })

    /* it("Returns 422 if message hasn't been deleted because the message has more than 2 reports but the user has less than 5 reports", (done) => {
        axios({
            method: 'delete',
            url: 'http://localhost:4444/message',
            data: {idMessage: 8}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'NOT_BANNED_USER')
            done()
        })
    }) */


})