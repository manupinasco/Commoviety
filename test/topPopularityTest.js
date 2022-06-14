const chai = require('chai')
const axios = require('axios')
const chaiFetch = require('chai-fetch')
chai.use(chaiFetch)
const { assert } = chai

describe('Top popularity', () => {

    it("Doesn't return movies if '0' is sent as a parameter", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/moviesTopPopularity/0',
        }).then(response => {
            assert.equal(response.data.length, 0)
            done()
        })
    })

    it("Returned movie at index '0' is more popular than the one returned at index '1'", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/moviesTopPopularity/100',
        }).then(response => {
            assert(response.data[0].quantScores > response.data[1].quantScores)
            done()
        })
    })
    
    it("The quantity of returned movies is equal to the number sent as parameter", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/moviesTopPopularity/100',
        }).then(response => {
            assert.equal(response.data.length, 100)
            done()
        })
    }) 
})