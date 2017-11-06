var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// var newTodo = new Todo({
//     text: 'New mongoose file!'
// });

// newTodo.save().then((result) => {
//     console.log(`Saved todo ${result}`);
// }, (error) => {
//     console.log('Unable to save todo');
// });

// var otherTodo = new Todo({
//     text: 'Something to do'
// });

// otherTodo.save().then((result) => {
//     console.log(JSON.stringify(result, undefined, 2));
// }, (error) => {
//     console.log('Unable to save todo');
// })


//User
//email 

var Users = mongoose.model('Users', {
    username: {
        type: String
    },
    password:{
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var user =  new Users({
    username: 'jessicalewinter',
    email: 'jessica.lewinter@gdeste.ifce.edu.br'
});

user.save().then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
},(error) => {
    console.log('Unable to save Todo');
});
