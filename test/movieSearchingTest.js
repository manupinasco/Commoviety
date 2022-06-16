const chai = require('chai')
const axios = require('axios')
const chaiFetch = require('chai-fetch')
chai.use(chaiFetch)
const { assert } = chai

describe('Movie seaching by name', () => {
    let idMovie
    before(() => {
        return axios({
            method: 'post',
            url: 'http://localhost:4444/movies',
            data: { name: "Spiderman", description: "lorem ipsum", platform: "netflix" }
        })
            .then((response) => {
                idMovie = response.data.idMovie
            })
    })

    it("Finds a movie if an existing movie's name starts with the sent field or is equal to the sent field", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/movies?name=spiderman',
        }).then(response => {
            assert.equal(response.data[0].name, "Spiderman")
            done()
        })
    })

    it("Finds a movie if an existing movie's name starts with the sent field and the field has more than 2 characters", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/movies?name=spi'
        }).then(response => {
            assert(response.data[0].name.startsWith('Spi'))
            done()
        })
    })

    it("Doesn't find any movie if the field has less than 3 characters", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/movies?name=sp',
        }).then(response => {
            assert.equal(response.data.length, 0)
            done()
        })
    })

    it("Doesn't find any movie if none of the existing movie's names start with the sent field and none are not equal to it", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/movies?name=sfsdsfsf',
        }).then(response => {
            assert.equal(response.data.length, 0)
            done()
        })
    })

    after(() => {
        return axios({
            method: 'delete',
            url: 'http://localhost:4444/movies',
            data: { id: idMovie}
        })
    })
})
