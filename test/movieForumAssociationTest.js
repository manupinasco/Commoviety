const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const { assert } = chai;


describe('Movie and Forum Association', () => {

    let idMovie
    let idForum
    before('Create Movie and Forum', () => {
        let createForum = async () => {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/forums',
                data: {}

            }).then((response) => {
                idForum = response.data.idForum
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
        }
        let createMovie = async () => {
            return axios({
                method: 'post',
                url: 'http://localhost:4444/movies',
                data: { name: 'Antman', description: 'lorem ipsum', platform: 'Netflix' }

            }).then((response) => {
                idMovie = response.data.idMovie
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
        }

        return Promise.all([createForum, createMovie].map(fn => fn()))
    })


    it('Returns 201 if Movie and Forum are saved', (done) => {

        axios({
            method: 'post',
            url: 'http://localhost:4444/moviesForums',
            data: { idMovie: idMovie, idForum: idForum }

        }

        ).then((response) => {
            assert.equal(response.status, 201)
            done()
        }).catch((err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    })

    it('Returns 422 if MovieForum exist', (done) => {
        axios({
            method: 'post',
            url: 'http://localhost:4444/moviesForums',
            data: { idMovie: idMovie, idForum: idForum }
        })
            .catch(err => {
                assert.equal(err.response.data.message, 'MOVIEFORUM_EXISTS')
                done()
            })
    })

    after('Delete MovieForum, Movie and Forum', () => {

        async function deleteForum() {
            return axios({
                method: 'delete',
                url: 'http://localhost:4444/forums',
                data: { id: idForum }

            }).then((response) => {
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })

        }
        async function deleteMovie() {
            return axios({
                method: 'delete',
                url: 'http://localhost:4444/movies',
                data: { id: idMovie }

            }).then((response) => {
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
        }
        return Promise.all([deleteForum, deleteMovie].map(fn => fn()))
    })


})