var express =  require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/users');


var app = express();

app.use(bodyParser.json());

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
        console.log('This ID is not valid');
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            return request(app).get('/todos/:id').express(400);
        }
        return res.send(req.params);
    },(err) => {
        console.log('error found');
    })

});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};