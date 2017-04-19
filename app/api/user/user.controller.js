import jwt from 'jsonwebtoken';

import User from './user.model';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
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
        let token = jwt.sign({_id : user._id}, 'hodong-secret', {
            expiresIn : 60 * 60 * 5
        });
        res.json({token});
    })
    .catch(validationError(res));
}
