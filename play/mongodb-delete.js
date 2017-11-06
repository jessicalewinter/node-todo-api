// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server successfully');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Users').findOneAndDelete({name: "Jessica"}).then((result) => {
    //     console.log(result);
    // })

    db.collection('Users').deleteMany({name: 'Jessica'}).then((result) => {
        console.log(result);
    });

    
    db.collection('Users').findOneAndDelete({_id: ObjectID("5a00a6102c3570399cfed47d")}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    })

    // db.close();
});

