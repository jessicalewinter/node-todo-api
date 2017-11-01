const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server successfully');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false,
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Jessica',
        age: 23,
        location: 'Fortaleza- Brazil',
    }, (error, result) => {
        if(error){
            return console.log('Unable to insert todo', error);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close();
});

