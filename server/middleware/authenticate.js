var {Users} = require('./../models/users');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    
    Users.findByToken(token).then((users) => {
        if(!users){
            return Promise.reject();
        }
       req.users = users;
       req.token = token;
       next();
    }).catch((e) => {
        res.status(401).send();
    });
    
};

module.exports = {authenticate};
