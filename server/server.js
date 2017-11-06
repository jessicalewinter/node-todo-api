var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({
    text: 'New mongoose file!'
});

newTodo.save().then((result) => {
    console.log(`Saved todo ${result}`);
}, (error) => {
    console.log('Unable to save todo');
});

var otherTodo = new Todo({
    text: 'Second Mongoose file',
    completed: true,
    completedAt: 123
});

otherTodo.save().then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
}, (error) => {
    console.log('Unable to save todo');
})
