const chai = require('chai')
const axios = require('axios')
const chaiFetch = require('chai-fetch')
chai.use(chaiFetch)
const { assert } = chai

describe('Top average score', () => {

    let idMovie1
    let idMovie2
    let idMovie3
    before(() => {
        let createMovie1 = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/movies',
                data: {name: 'Titanic', description: 'lorem ipsum', platform: 'Netflix', averageScore: 7}
                
            }).then((response) => {
                idMovie1 = response.data.idMovie
            })
            
        }
        let createMovie2 = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/movies',
                data: {name: 'Avatar', description: 'lorem ipsum', platform: 'Netflix', averageScore: 8}
                
            }).then((response) => {
                idMovie2 = response.data.idMovie
            })
        }
        let createMovie3 = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/movies',
                data: {name: 'Suicide Squad', description: 'lorem ipsum', platform: 'Netflix', averageScore: 10}
                
            }).then((response) => {
                idMovie3 = response.data.idMovie
            })
        }
        return Promise.all([createMovie1, createMovie2, createMovie3].map(fn => fn()))
    })

    it("Doesn't return movies if '0' is sent as a parameter", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/moviesTopAvgScore/0',
        }).then(response => {
            assert.equal(response.data.length, 0)
            done()
        })
    })

    it("Returned movie at index '0' has a higher average score than the one returned at index '1'", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/moviesTopAvgScore/3',
        }).then(response => {
            assert(response.data[0].averageScore > response.data[1].averageScore)
            done()
        })
    })
    
    it("The quantity of returned movies is equal to the number sent as parameter", (done) => {
        axios({
            method: 'get',
            url: 'http://localhost:4444/moviesTopAvgScore/2',
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