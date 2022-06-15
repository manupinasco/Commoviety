const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('ScoreCreation', () => {

    let idUser
    let idMovie
    let idUser2
    let idMovie2


    before('Create User and Movie', () => {
        let createMovie = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/movies',
                data: {name: 'Spiderman', description: 'lorem ipsum', platform: 'Netflix'}
                
            }).then((response) => {
                idMovie = response.data.idMovie
                assert.equal(response.status, 201)
            }, (err) => {
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
            }, (err) => {
                assert.equal(err.response.status, 201)
            })
        }
        let createMovie2 = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/movies',
                data: {name: 'Coraline', description: 'lorem ipsum', platform: 'Netflix'}
                
            }).then((response) => {
                idMovie2 = response.data.idMovie
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 201)
            })
        }
        let createUser2 = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/users',
                data: {nickname: 'Martin'}
                
            }).then((response) => {
                idUser2 = response.data.idUser
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 201)
            })
        }
        return Promise.all([createMovie, createUser, createMovie2, createUser2].map(fn => fn()))
    })

    it('Returns 201 if the Score is saved and associated', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/scoreUser',
            data: {idUser: idUser, idMovie: idMovie, value: 5}
            
        }
        
        ).then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    })

  it('Returns 201 if the value is updated', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/scoreUser',
            data: {idUser: idUser, idMovie: idMovie, value: 2}
        })
        .then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    })

    it('Returns 201 if the List is created and the Movie added', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/scoreUser',
            data: {idUser: idUser2, idMovie: idMovie2, value: 2}
        })
        .then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    })

    it('Returns 201 if the Movie is added to the List', (done) => {
        axios({
            method : 'post',
            url: 'http://localhost:4444/scoreUser',
            data: {idUser: idUser2, idMovie: idMovie2, value: 2}
        })
        .then((response) => {
            
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            assert.equal(err.response.status, 201)
            done()
        })
    }) 

    after('Delete User and Movie', () => {
        let deleteMovie = async () => {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/movies',
                data: {id: idMovie}
                
            }).then((response) => {
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 201)
            })
            
            
            
        }
        let deleteUser = async () => {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/users',
                data: {id: idUser}
                
            }).then((response) => {
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 422)
            })
        }
        let deleteMovie2 = async () => {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/movies',
                data: {id: idMovie2}
                
            }).then((response) => {

                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 422)
            })
        }
        let deleteUser2 = async () => {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/users',
                data: {id: idUser2}
                
            }).then((response) => {

                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 201)
            })
        }
        
        return Promise.all([deleteMovie, deleteUser, deleteMovie2, deleteUser2].map(fn => fn()))

        
    })


    

})