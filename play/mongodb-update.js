// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server successfully');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5a00a5202c3570399cfed426")
    // }, {
    //     $set: {
    //         text: 'Hello MongoDB!'
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5a00aa482c3570399cfed570")
    },{
        $inc: {
            age: -16
        },
         $set: {
            name: 'Jessica'
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })

    // db.close();
});

