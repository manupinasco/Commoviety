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
        let crearMovie = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/movies',
                data: {name: 'Spiderman', description: 'lorem ipsum', platform: 'Netflix'}
                
            }).then((response) => {
                idMovie = response.data.idMovie
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 422)
            })
        }
        let crearUser = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/users',
                data: {nickname: 'Charlie'}
                
            }).then((response) => {
                idUser = response.data.idUser
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 422)
            })
        }
        let crearMovie2 = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/movies',
                data: {name: 'Coraline', description: 'lorem ipsum', platform: 'Netflix'}
                
            }).then((response) => {
                idMovie2 = response.data.idMovie
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 422)
            })
        }
        let crearUser2 = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/users',
                data: {nickname: 'Martin'}
                
            }).then((response) => {
                idUser2 = response.data.idUser
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 422)
            })
        }
        return Promise.all([crearMovie, crearUser, crearMovie2, crearUser2].map(fn => fn()))
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
            assert.equal(err.response.status, 422)
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
            assert.equal(err.response.status, 422)
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
            assert.equal(err.response.status, 422)
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
            assert.equal(err.response.status, 422)
            done()
        })
    }) 

    after('Delete User and Movie', () => {
        let borrarMovie = async () => {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/movies',
                data: {id: idMovie}
                
            }).then((response) => {
                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 422)
            })
            
            
            
        }
        let borrarUser = async () => {
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
        let borrarMovie2 = async () => {
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
        let borrarUser2 = async () => {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/users',
                data: {id: idUser2}
                
            }).then((response) => {

                assert.equal(response.status, 201)
            }, (err) => {
                assert.equal(err.response.status, 422)
            })
        }
        
        return Promise.all([borrarMovie, borrarUser, borrarMovie2, borrarUser2].map(fn => fn()))

        
    })


    

})