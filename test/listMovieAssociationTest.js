const chai = require('chai');
const axios = require('axios');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const {assert} = chai;


describe('ListMovieAssociation', () => {

    let idMovie
    let idList
    let idUser
    before('Create List, User and Movie', () => {
        let createUser = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/users',
                data: {nickname: 'Charlie'}
               
            }).then((response) => {
                idUser = response.data.idUser
                assert.equal(response.status, 201)
            }).catch( (err) => {
                assert.equal(err.response.status, 201)
            })
        }
        let createMovie = async () => {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/movies',
                data: {name: 'Coraline', description: 'lorem ipsum', platform: 'Netflix'}
                
            }).then((response) => {
                
                idMovie = response.data.idMovie
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
        }
        async function createList() {
            return axios({
                method : 'post',
                url: 'http://localhost:4444/lists',
                data: {nameList: 'BeautifulRomanticMovies', idUser: idUser}
                
            }).then((response) => {
                idList = response.data.idList
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
        }
        

        return Promise.all([createMovie, createUser].map(fn => fn())).then(createList)
    })



    it('Returns 201 if List and Movie are associated correctly', (done) => {
        axios({
            method: 'post',
            url: 'http://localhost:4444/listMovie',
            data: {idList: idList, idMovie: idMovie}
             
        }
        
        ).then((response) => {
            assert.equal(response.status, 201)
            done()
        }, (err) => {
            
            assert.equal(err.response.status, 201)
            done()
        })
    })

   it('Returns 422 if ListMovie exists', (done) => {

        axios({
            method : 'post',
            url: 'http://localhost:4444/listMovie',
            data: {idList: idList, idMovie: idMovie}
        })
        .catch(err => {
            assert.equal(err.response.data.message, 'LISTMOVIE_ALREADY_EXISTS')
            done()
        })
    })

    after('Delete Delete ListMovie, Movie, List y User', (() => {

        let deleteAssociation = async() => { 
            return axios({
            method: 'delete',
            url: 'http://localhost:4444/listMovie',
            data: {idList: idList, idMovie: idMovie}
        }).then((response) => {
            assert.equal(response.status, 201)
        }).catch((err) => {
            assert.equal(err.response.status, 201)
        })
    }
        async function deleteMovie() {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/movies',
                data: {id: idMovie}
               
            }).then((response) => {
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
           
           
           
        }

        async function deleteList() {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/lists',
                data: {id: idList}
               
            }).then((response) => {
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
           
           
           
        }
        async function deleteUser() {
            return axios({
                method : 'delete',
                url: 'http://localhost:4444/users',
                data: {id: idUser}
               
            }).then((response) => {
                assert.equal(response.status, 201)
            }).catch((err) => {
                assert.equal(err.response.status, 201)
            })
        }

        

    return Promise.all([deleteAssociation].map(fn => fn())).then(deleteList).then(deleteMovie).then(deleteUser)
 
    }))

    




})