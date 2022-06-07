const express = require('express')
const app = express()
const {Score} = require('./src/db/models/') //por defecto busca index.js. En este caso devuelve el objeto db{} con todos los modelos
const {Movie} = require('./src/db/models')

app.get('/', function (req, res){
    res.send('hello')
})

app.get('/scores', async function (req, res) {
    let data = await Score.findAll() //viene del Model de sequelize
    
    
    res.send(data)
})

app.get('/scores/:id', async function (req, res) {
    let data = await Score.findByPk(req.params.id)
    
    
    res.send(data)
})

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
