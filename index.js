const express = require('express');

const app = express();

const { User, Forum } = require('./src/db/models')

const { Score } = require('./src/db/models/')
const { Movie } = require('./src/db/models')

const { Op } = require("sequelize");


app.listen(4444)



app.get('/users', async function (req, res) {

    try {
        let data = await User.findAll()

        res.send(data)
    }
    catch (error) {
        console.log(error)
    }




})

app.get('/forums', async function (req, res) {


    let q = { "id": 2 }

    try {
        let data = await Forum.findAll({
            where: q/* ,
            limit: 20 */
        })

        res.send(data)
    }
    catch (error) {
        console.log(error)
    }




})


app.get('/users/:id', async function (req, res) {
    let data = await User.findByPk(req.params.id)

    res.send(data)
})

app.post('/usersForums/:idUser/:idForum', async function (req, res) {
    try {
        let user = await User.findByPk(req.params.idUser)

        if (user.getForums().length < 25) {
            console.warn("User " + req.params.idUser + " is already participating in 25 forums, which is the limit")
        }
        else {
            let forum = await Forum.findByPk(req.params.idForum)
            forum.addUser(user)

        }
    }
    catch (error) {
        console.log(error)
    }
})



app.get('/scores', async function (req, res) {
    let data = await Score.findAll() //viene del Model de sequelize


    res.send(data)
})

app.get('/scores/:id', async function (req, res) {
    let data = await Score.findByPk(req.params.id)


    res.send(data)
})

app.get('/movies', async function (req, res) {
    data = await Movie.findAll()
    res.send(data)
})

app.get('/movies/:id', async function (req, res) {
    data = await Movie.findByPk(req.params.id)
    res.send(data)
})

app.get('/moviesCreate', async function (req, res) {
    Movie.create({
        name: 'spiderman',
        description: 'lorem ipsum',
        platform: 'netflix'
    })
})

app.get('/moviesTopPopularity/:quantity', async function (req, res) {
    try {
        movies = await Movie.findAll({
            limit: Number(req.params.quantity),
            order: [
                ['quantScores', 'DESC']
            ]
        })
        console.log(movies)
        res.send(movies)
    }
    catch(error) {
        res.status(422).json(error)
    }
    

})