const express = require('express');
const { Op } = require("sequelize");
const app = express();

<<<<<<< HEAD
const {User, Forum} = require('./src/db/models')

const {Score} = require('./src/db/models/') 
const {Movie, List} = require('./src/db/models');
=======
const { User, Forum } = require('./src/db/models')
const { Score } = require('./src/db/models/')
const { Movie } = require('./src/db/models');
>>>>>>> f635937612666fa4033fc502a4a5bd80adc5e791

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

app.post('/usersForums', async function(req, res) {
    
    
    
    try {
        let user = await User.findByPk(req.body.idUser)
        let forum = await Forum.findByPk(req.body.idForum)

        if(user.hasForum(forum)) {
            return res.status(422).json({message: 'USERFORUM_EXISTS'})
        }

        else {
            if(user.getForums().length < 25) {
               return res.status(403).json({message: 'LIMIT_AMOUNT_FORUMS'})
            }
            else {
                
                forum.addUser(user)

                res.status(201).json({})
    
            }
        }

        
    }
    catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
})



app.get('/scores', async function (req, res) {
<<<<<<< HEAD
    let data = await Score.findAll()
    
    
=======
    let data = await Score.findAll() //viene del Model de sequelize


>>>>>>> f635937612666fa4033fc502a4a5bd80adc5e791
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

app.post('/scoreUser', async function (req, res) {
    try {
        let scoreObject = await Score.findAll({where: {
            MovieId: req.body.idMovie,
            UserId: req.body.idUser
        }})
        if(scoreObject.length > 0) {
            await Score.update({value: req.body.value}, {where: {MovieId: req.body.idMovie,
                UserId: req.body.idUser}})
            res.status(201).json({})
            
        }

        else {
                const scoreInstance = await Score.build( {
                    value: req.body.value
                })

                let user = await User.findByPk(req.body.idUser)

                await scoreInstance.save()

                let movie = await Movie.findByPk(req.body.idMovie)


                scoreInstance.setUser(user)

                

                scoreInstance.setMovie(movie)

                let list = await List.findOne({where: {
                    UserId: req.body.idUser,
                    name: 'MoviesWatched'
                }})

                if(list != null) {
                    let myList = await List.findByPk(list.id)
                    console.log(list.id)
                    list.addMovie(movie)
                }
                else {
                    const listInstance = await List.build( {
                        name: 'MoviesWatched'
                    })
                    await listInstance.save()
                    user.addList(listInstance)
                    listInstance.addMovie(movie)
                }

                
                res.status(201).json({})


                



                
        }

        

        
    }
    catch(error) {
        console.log(error)
        res.status(422).json(error)
    }
})
app.delete('/movies', async function (req, res){
    Movie.destroy({
        where: {
            name: req.body.name
          }
    })
}) 
