require('./config/config');

const _ = require('lodash');
const express =  require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

//-------------------------Todo requests-----------------------------------------------------

//POST /todos/

app.post('/todos', (req, res) => {
    var todo =  new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
});

//GET /todos/

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

//GET /todos/1234345

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(400).send();
        }
        return res.send({todo});
    },(err) => {
        res.status(400).send();
    })

});

//DELETE /todos/:id

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        return res.status(200).send({todo});
    }, (err) => {
        res.status(400).send();
    });
   
});

//PATCH /todos/:id

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        return res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    })

});

//-------------------------Users requests-------------------------------------------------------

//POST /users/

app.post('/users',(req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var users = new Users(body);

    users.save().then(() => {
        return users.generateAuthToken();  
    }).then((token) => {
        res.header('x-auth',token).send(users);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

//GET /users/me

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.users);
});

//POST users/login {email, password}

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    
    Users.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(user);
        });
        res.send(user);
    }).catch((e) => {
        res.status(400).send();
    });    
});

//Port setup

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};