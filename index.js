const express = require('express');
const { Op } = require("sequelize");
const app = express();


const { User, Forum } = require('./src/db/models')
const { Score } = require('./src/db/models/')
const { Message } = require('./src/db/models');
const { Movie, List } = require('./src/db/models');


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.listen(4444)


/* ------------------------------------------------- */
/* -----------ASSOCIATE USER WITH FORUM------------- */
/* ------------------------------------------------- */

app.post('/usersForums', async function (req, res) {



    try {
        let user = await User.findByPk(req.body.idUser)
        let forum = await Forum.findByPk(req.body.idForum)
        let associationExists = await user.hasForum(forum)


        if(associationExists) {
            return res.status(422).json({message: 'USERFORUM_EXISTS'})
        }

        else {
                await forum.addUser(user)
                res.status(201).json({})
                
        }


    }
    catch (error) {
        res.status(422).json(error)
    }
})



/* ------------------------------------------------- */
/* ----------DESASSOCIATE USER WITH FORUM----------- */
/* ------------------------------------------------- */
app.delete('/usersForums', async function (req, res) {
    try {
        let user = await User.findByPk(req.body.idUser)
        let forum = await Forum.findByPk(req.body.idForum)
        let userForumAssoExist = await user.hasForum(forum)
        //Se revisa si el usuario y el foro estan asociados
        if (userForumAssoExist) {
            await forum.removeUsers(user)
            res.status(201).json({})
        }
        else {
            return res.status(422).json({ message: 'UNASSOCIATED_USER' })
        }
    }
    catch (error) {
        res.status(422).json(error)
    }
})


/* ------------------------------------------------- */
/* ----------------GET SCORES BY ID----------------- */
/* ------------------------------------------------- */

app.get('/scores/:id', async function (req, res) {
    let data = await Score.findByPk(req.params.id)


    res.send(data)
})

/* ------------------------------------------------- */
/* -------------SEARCH MOVIES BY NAME--------------- */
/* ------------------------------------------------- */
app.get('/movies', async function (req, res) {
    if (req.query.name != undefined) {
        //Se revisa si al menos hay tres caracteres cuando se busca por nombre 
        if (req.query.name.length >= 3) {
            data = await Movie.findAll({
                where: {
                    //Filtra si algun nombre de pelicula empieza con el nombre enviado o es igual a este
                    name: {
                        [Op.like]: req.query.name + '%'
                    }
                }
            })
            console.log(data)
        } else {
            //Si el nombre enviado tiene menos de 3 caracteres, aunque alguna pelicula empieze por este, no se decolvera
            data = []
        }
    } else {
        //Si no se busca por nombre, aparecen todas las peliculas
        data = await Movie.findAll();
    }
    res.send(data)
})

/* ------------------------------------------------- */
/* -----------------CREATE MOVIE-------------------- */
/* ------------------------------------------------- */

app.post('/movies', async function (req, res) {
    let movie = await Movie.create({
        name: req.body.name,
        description: req.body.description,
        platform: req.body.platform
    })
    res.status(201).json({idMovie: movie.id})
})

/* ------------------------------------------------- */
/* ------------------CREATE FORUMS------------------ */
/* ------------------------------------------------- */

app.post('/forums', async function (req, res) {
    let forum = await Forum.create({

    })
    res.status(201).json({idForum: forum.id})
})

/* ------------------------------------------------- */
/* --------GET TOP POPULARITY OF MOVIES------------- */
/* ------------------------------------------------- */

app.get('/moviesTopPopularity/:quantity', async function (req, res) {
        let movies = await Movie.findAll({
            limit: Number(req.params.quantity),
            order: [
                ['quantScores', 'DESC']
            ]
        })
        res.send(movies)
})

/* ------------------------------------------------- */
/* -------CREATE SCORE ASSOCIATED TO A USER--------- */
/* ------------------------------------------------- */

app.post('/scoreUser', async function (req, res) {
    try {
        let scoreObject = await Score.findAll({
            where: {
                MovieId: req.body.idMovie,
                UserId: req.body.idUser
            }
        })
        if (scoreObject.length > 0) {
            await Score.update({ value: req.body.value }, {
                where: {
                    MovieId: req.body.idMovie,
                    UserId: req.body.idUser
                }
            })
            res.status(201).json({})

        }

        else {
            const scoreInstance = await Score.build({
                value: req.body.value
            })

            let user = await User.findByPk(req.body.idUser)

            await scoreInstance.save()

            let movie = await Movie.findByPk(req.body.idMovie)


            scoreInstance.setUser(user)



            scoreInstance.setMovie(movie)

            let list = await List.findOne({
                where: {
                    UserId: req.body.idUser,
                    name: 'MoviesWatched'
                }
            })

            if (list != null) {
                let myList = await List.findByPk(list.id)
                console.log(list.id)
                list.addMovie(movie)
            }
            else {
                const listInstance = await List.build({
                    name: 'MoviesWatched'
                })
                await listInstance.save()
                user.addList(listInstance)
                listInstance.addMovie(movie)
            }


            res.status(201).json({})

        }
    }
    catch (error) {
        res.status(422).json(error)
    }
})

/* ------------------------------------------------- */
/* ----------------ADD MESSAGE TO FORUM------------- */
/* ------------------------------------------------- */

app.post('/messagesForums', async function (req, res) {
    try {
        let message = await Message.findByPk(req.body.idMessage)
        let forum = await Forum.findByPk(req.body.idForum)
        let messageUser = await User.findByPk(message.getDataValue('userId'))
        let userForumAssoExist = await messageUser.hasForum(forum)
        console.log(userForumAssoExist)
        // Si el usuario del mensaje no esta asociado al foro, no se podra agregar el mensaje
        if (userForumAssoExist) {
            // Si el usuario del mensaje tiene 5 denuncias, no se podra agregar el mensaje
            if (messageUser.getDataValue('reports') == 5) {
                return res.status(422).json({ message: 'BANNED_USER' })
            } else {
                forum.addMessage(message)
                res.status(201).json({})
            }
        } else {
            return res.status(422).json({ message: 'USERFORUM_NO_EXISTS' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
})

/* ------------------------------------------------- */
/* ------------------CREATE MESSAGE----------------- */
/* ------------------------------------------------- */

app.post('/messages', async function (req, res) {
    let message = await Message.create({
        userId: req.body.idUser,
        text: "lorem ipsum",
        reports: 0
    })
    res.status(201).json({idMessage: message.id})
})

/* ------------------------------------------------- */
/* ---------------------BAN USER-------------------- */
/* ------------------------------------------------- */

app.put('/banUser', async function (req, res) {
    try {
        let user = await User.findByPk(req.body.idUser)
        //Le asigno al usuario del mensaje 5 denuncias por lo que queda baneado para mandar mensajes
        await user.update({
            reports: 5,
        })
        res.status(201).json({})
    }
    catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
})

/* ------------------------------------------------- */
/* -------------------DELETE MESSAGE---------------- */
/* ------------------------------------------------- */
app.delete('/message', async function (req, res) {
    try {
        let message = await Message.findByPk(req.body.idMessage)
        let messageUser = await User.findByPk(message.getDataValue('userId'))
        console.log(message.getDataValue('reports'))
        if (message.getDataValue('reports') >= 3) {
            if (messageUser.getDataValue('reports') >= 5) {
                await Message.destroy({
                    where: {
                        id: req.body.idMessage
                    }
                })
                res.status(201).json({})
            } else {
                return res.status(422).json({ message: 'NOT_BANNED_USER' })
            }
        } else {
            return res.status(422).json({ message: 'FEW_REPORTS_IN_MESSAGE' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
})

/* ------------------------------------------------- */
/* -------------------REPORT MESSAGE---------------- */
/* ------------------------------------------------- */
app.put('/messageReport', async function (req, res) {
    try {
        let message = await Message.findByPk(req.body.idMessage)
        if (message != null) {
            if (message.getDataValue('reports') < 3) {
                await message.update({
                    reports: message.getDataValue('reports') + 1,
                })
                res.status(201).json({})
            } else {
                return res.status(422).json({ message: 'MANY_TIMES_REPORTED_MESSAGE' })
            }
        } else {
            return res.status(422).json({ message: 'MESSAGE_DOESNT_EXIST' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
})

/* ------------------------------------------------- */
/* -------------CREATE A LIST OF MOVIES------------- */
/* ------------------------------------------------- */

app.post('/lists', async function (req, res) {
    try {
        if (req.body.nameList != '') {
            if (req.body.nameList != 'MoviesWatched') {
                let list = await List.findOne({
                    where: {
                        UserId: req.body.idUser,
                        name: req.body.nameList
                    }
                })

                if (list == null) {
                    let listInstance = await List.build({
                        name: req.body.nameList
                    })
                    await listInstance.save()
                    let user = await User.findByPk(req.body.idUser)
                    user.addList(listInstance)
                    res.status(201).json({idList: listInstance.id})
                }
                else {
                    return res.status(422).json({ message: 'NAME_ALREADY_IN_USE' })
                }

            }
            else {
                return res.status(422).json({ message: 'NAME_NOT_ALLOWED' })
            }
        }
        else {
            return res.status(422).json({ message: 'EMPTY_NAME' })
        }
    }
    catch (error) {
        res.status(422).json(error)
    }

})


/* ------------------------------------------------- */
/* -----------------ADD MOVIE TO A LIST------------- */
/* ------------------------------------------------- */

app.post('/listMovie', async function (req, res) {
    try {
        let list = await List.findByPk(req.body.idList)
        let movie = await Movie.findByPk(req.body.idMovie)
        let associationExists = await list.hasMovie(movie)


        if(associationExists) {
            return res.status(422).json({message: 'LISTMOVIE_ALREADY_EXISTS'})
        }

        else {

            list.addMovie(movie)
            res.status(201).json({})

        }


    }
    catch (error) {
        res.status(422).json(error)
    }
    
    })

/* ------------------------------------------------- */
/* --------------------DELETE USER------------------ */
/* ------------------------------------------------- */

/* app.delete('/user', async function (req, res){
    try {
        let user = await User.findByPk(req.body.idUser)
        if(user != null) {
            User.destroy({
                where: {
                    id: req.body.idUser
                  }
            })
            res.status(201).json({})
        }
        else {
            return res.status(422).json({message: 'USER_DOESNT_EXIST'})
        }
    }
    catch(error) {
        res.status(422).json(error)
    }
})
 */
/* ------------------------------------------------- */
/* ------------SEARCH USER BY NICKNAME-------------- */
/* ------------------------------------------------- */

app.get('/users', async function(req, res) {
    if (req.query.name != undefined) {
        if (req.query.name.length >= 3) {
            data = await User.findAll({
                where: {
                    nickname: {
                        [Op.like]: req.query.name + '%'
                    }
                }
            })
        } else {
            data = []
        }
    } else {
        data = await User.findAll();
    }
    res.send(data)
})

/* ------------------------------------------------- */
/* --------------------CREATE USER------------------ */
/* ------------------------------------------------- */

app.post('/users', async function (req, res) {
    let user = await User.create({
        nickname: req.body.nickname,
        mail: 'sm@example.com',
        password: '****',
        reports: 0
    })
    res.status(201).json({idUser: user.id})
})

/* ------------------------------------------------- */
/* --------------------REPORT USER------------------ */
/* ------------------------------------------------- */
app.put('/userReport', async function (req, res) {
    try {
        let user = await User.findByPk(req.body.idUser)
        if(user != null){
            if(user.getDataValue('reports') < 5){
                user.update({
                    reports: user.getDataValue('reports') + 1,
                })
                res.status(201).json({})
            }else{
                return res.status(422).json({ message: 'MANY_TIMES_REPORTED_USER' })
            }
        }else{
            return res.status(422).json({ message: 'USER_DOESNT_EXIST' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
})

/* ------------------------------------------------- */
/* -------------REMOVE MOVIE FROM LIST-------------- */
/* ------------------------------------------------- */
app.delete('/listMovie', async function (req, res) {
    try {
        const list = await List.findByPk(req.body.idList)
        const movie = await Movie.findByPk(req.body.idMovie)
        await list.removeMovie(movie)
        res.status(201).json({})
    }
    catch(error) {
        res.status(422).json(error)
    }
    })


/* ------------------------------------------------- */
/* --------------------DELETE MOVIE----------------- */
/* ------------------------------------------------- */

app.delete('/movies', async function (req, res) {
    try {
        await Movie.destroy({
            where: {
                id: req.body.id
            }
        })
        res.status(201).json({})
    }
    catch(error) {
        res.status(422).json(error)
    }
})

/* ------------------------------------------------- */
/* --------------------DELETE USER------------------ */
/* ------------------------------------------------- */

app.delete('/users', async function (req, res) {
    try {
        await User.destroy({
            where: {
                id: req.body.id
            }
        })
        res.status(201).json({})
    }
    catch(error) {
        res.status(422).json(error)
    }
})

/* ------------------------------------------------- */
/* --------------------DELETE FORUM------------------ */
/* ------------------------------------------------- */

app.delete('/forums', async function (req, res) {
    try {
        await Forum.destroy({
            where: {
                id: req.body.id
            }
        })
        res.status(201).json({})
    }
    catch(error) {
        res.status(422).json(error)
    }
})

/* ------------------------------------------------- */
/* --------------------DELETE LIST------------------ */
/* ------------------------------------------------- */

app.delete('/lists', async function (req, res) {
    try {
        await List.destroy({
            where: {
                id: req.body.id
            }
        })
        res.status(201).json({})
    }
    catch(error) {
        res.status(422).json(error)
    }
})
