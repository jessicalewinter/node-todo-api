const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/users');

// var id = '5a02f12b011cb41091b53b7f1';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id', todo);
// }).catch((err) => {
//     console.log(err);
// });

Users.findById('5a00def96f4ff60c062240a8').then((user) => {
    if(!user){
        return console.log('Unable to found user');
    }
    console.log(JSON.stringify(user, undefined, 2));
},(e) => {
    console.log(e);
});
