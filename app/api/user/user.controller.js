import jwt from 'jsonwebtoken';

import User from './user.model';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function loginError(res, statusCode) {
  statusCode = statusCode || 404;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function create(req, res, next){

    let newUser = new User(req.body);

    newUser.save()
    .then((user) => {
        let token = jwt.sign({_id : user._id, name : user.name}, 'hodong-secret', {
            expiresIn : 60 * 60 * 5
        });
        res.json({token});
    })
    .catch(validationError(res));
}

export function login(req, res, next){

    let {email, password } = req.body;

    User.findOne({
        email : email.toLowerCase()
    }).exec()
        .then((user) => {
            if(!user){
                return res.status(401).json({message : "not user"});
            }
            if(user.authenticate(password)){

                let token = jwt.sign({_id : user._id, name : user.name}, 'hodong-secret', {
                    expiresIn : 60 * 60 * 5
                });
                res.json(token);
            }else{
                res.json({
                    statusCode : 0,
                    message : "Login failed",
                })
            }

        })
        .catch(loginError);
}
