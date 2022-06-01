const express = require('express')
const app = express()
const {Movie} = require('./src/db/models')
app.listen(6001)

app.get('/', function (req, res){
    res.send('Hello')
})

app.get('/movies', async function (req, res){
    data = await Movie.findAll()
    res.send(data)
})

app.get('/movies/:id', async function (req, res){
    data = await Movie.findByPk(req.params.id)
    res.send(data)
})

 app.get('/moviesCreate', async function (req, res){
    Movie.create({
        name : 'spiderman',
        description: 'lorem ipsum',
        platform: 'netflix'
    })
}) 