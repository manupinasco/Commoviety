const chai = require('chai')
const axios = require('axios')
const chaiFetch = require('chai-fetch')
chai.use(chaiFetch)
const { assert } = chai

describe('Top popularity', () => {

    let idMovie1
    let idMovie2
    let idMovie3
    before(() => {
        let createMovie1 = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/movies',
                data: {name: 'Batman', description: 'lorem ipsum', platform: 'Netflix', quantScores: 87}
                
            }).then((response) => {
                idMovie1 = response.data.idMovie
            })
            
        }
        let createMovie2 = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/movies',
                data: {name: 'Superman', description: 'lorem ipsum', platform: 'Netflix', quantScores: 566}
                
            }).then((response) => {
                idMovie2 = response.data.idMovie
            })
        }
        let createMovie3 = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/movies',
                data: {name: 'Aquaman', description: 'lorem ipsum', platform: 'Netflix', quantScores: 56}
                
            }).then((response) => {
                idMovie3 = response.data.idMovie
            })
        }
        return Promise.all([createMovie1, createMovie2, createMovie3].map(fn => fn()))
    })

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
            url: 'http://localhost:4444/moviesTopPopularity/3',
        }).then(response => {
            assert(response.data[0].quantScores > response.data[1].quantScores)
            done()
        })
    })
    
    it("The quantity of returned movies is equal to the number sent as parameter", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/moviesTopPopularity/2',
        }).then(response => {
            assert.equal(response.data.length, 2)
            done()
        })
    }) 

    after(() => {
        let deleteMovie1 = async () => {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/movies',
                data: {id: idMovie1}
                
            })
        }
        let deleteMovie2 = async () => {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/movies',
                data: {id: idMovie2}
                
            })
        }
        let deleteMovie3 = async () => {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/movies',
                data: {id: idMovie3}
                
            })
        }
        return Promise.all([deleteMovie1, deleteMovie2, deleteMovie3].map(fn => fn()))
    })
})
