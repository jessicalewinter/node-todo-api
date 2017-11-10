const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/users');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({_id: '5a05b82e545cad20a76ab507'}).then((doc) => {
//     console.log(doc);
// });

Todo.findByIdAndRemove('5a05bc34545cad20a76ab5080').then((todo) => {
    console.log(todo);
});
