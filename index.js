const express = require('express')
const app = express()
const {Score} = require('./src/db/models/') //por defecto busca index.js. En este caso devuelve el objeto db{} con todos los modelos

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
console.log('Listening at port 6001')