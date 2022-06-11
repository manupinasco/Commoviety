const express = require('express');
const { Op } = require("sequelize");
const app = express();

const { User, Forum } = require('./src/db/models')

const { Score } = require('./src/db/models/')
const { Movie } = require('./src/db/models');

app.use(express.json())
app.use(express.urlencoded({extended: false}))
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

/*            BUSQUEDA DE PELICULA POR NOMBRE            */
app.get('/movies', async function (req, res) { 
    if (req.query.name != undefined) {
        //Se revisa si al menos hay tres caracteres cuando se busca por nombre 
        if(req.query.name.length >= 3){ 
            data = await Movie.findAll({
                where: {
                    //Filtra si algun nombre de pelicula empieza con el nombre enviado o es igual a este
                    name: {
                        [Op.like]: req.query.name + '%'
                    }
                }
            })
        }else{
            //Si el nombre enviado tiene menos de 3 caracteres, aunque alguna pelicula empieze por este, no se decolvera
            data = []  
        }
    } else {
        //Si no se busca por nombre, aparecen todas las peliculas
        data = await Movie.findAll();
    }
    res.send(data)
})

app.post('/movies', async function (req, res){
    Movie.create({
        name : req.body.name,
        description: 'lorem ipsum',
        platform: 'netflix'
    })
}) 

app.delete('/movies', async function (req, res){
    Movie.destroy({
        where: {
            name: req.body.name
          }
    })
}) 