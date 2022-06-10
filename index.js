const express = require('express');

const app = express();

const {User, Forum} = require('./src/db/models')

const {Score} = require('./src/db/models/') 
const {Movie} = require('./src/db/models')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(4444)



app.get('/users', async function(req, res) {
    
    try {
        let data = await User.findAll() 

        res.send(data)
    }
    catch(error) {
        console.log(error)
    }
    
    
    

})

app.get('/forums', async function(req, res) {
    
    
    let q = {"id": 2}

    try {
        let data = await Forum.findAll({
            where: q/* ,
            limit: 20 */
        }) 

        res.send(data)
    }
    catch(error) {
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
                console.warn("User " + req.body.idUser + " is already participating in 25 forums, which is the limit")
            }
            else {
                
                forum.addUser(user)

                res.status(201).json({})
    
            }
        }

        
    }
    catch(error) {
        console.log(error)
        res.status(422).json(error)
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
