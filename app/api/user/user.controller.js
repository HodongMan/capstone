import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

import User from './user.model';
import Music from '../music/music.model';

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
        res.json({
            token,
        });
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
                res.json({
                    token,
                });
            }else{
                res.json({
                    statusCode : 0,
                    message : "Login failed",
                })
            }

        })
        .catch(loginError);
}

export function otherMusic(req, res, next){
    User.findOne({
        name : req.params.username,
    })
    .then((user) => {
        if(!user){
            return res.status(401).json(handleError(res));
        }
        return res.status(202).json(user.like.reverse());
    })
    .catch(handleError(res));
}

export function index(req, res, next){

    User.findOne({
        _id : req.params.userId,
    })
    .then((user) => {
        if(!user){
            return res.status(401).json({message : "not user", statusCode : 0});
        }

        res.status(202).json({
            name : user.name,
            image : user.image,
        })
    })
    .catch(handleError(res));
}

const storage = multer.diskStorage({

    destination : (req, file, cb) => {
        cb(null, path.resolve(__dirname , '../../../img/profile'));
    },
    filename : (req, file, cb) => {
        file.uploadedFile = {
            name : req.user.name,
            ext : file.mimetype.split('/')[1]
        };

        cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
    },
});

export const upload = multer({storage,}).single('UploadFile');

export function image(req, res, next){

    let newFileName = "http://ec2-52-79-215-229.ap-northeast-2.compute.amazonaws.com/profile/" + req.file.filename;

    User.findById({_id : req.user._id})
    .then((user) => {
        if(!user){
            return res.status(401).json({message : "Not user", statusCode : 0});
        }

        user.image = newFileName;

        user.save()
        .then((user) => {
            res.status(202).json({
                image : user.image,
            });
        })
        .catch((error) => handleError(res));
    })
    .catch(handleError(res));
}

export function me(req, res, next){

    User.findById({_id : req.user._id})
    .then((user) => {
        if(!user){
            return res.status(401).json({message : "Not user", statusCode : 0});
        }

        res.status(202).json({
            name : user.name,
            image : user.image,
        });
    })
    .catch(handleError(res));

}


export function user(req, res, next){

    User.findOne({
        name : req.params.username,
    })
    .then((user) => {
        if(!user){
            return res.status(401).json(handleError(res));
        }
        return res.status(202).json({
            image : user.image,
            _id : user._id,
            name : user.name,
        });
    })
    .catch(handleError(res));
}

export function like(req, res, next){

    let videoId = req.params.videoId;


    User.findById({_id : req.user.id})
    .then((user) => {

        Music.findOne({videoId,})
        .then((music) => {

            if(!music){
                return handleError(res);
            }

            user.like.push(music);

            user.save()
            .then((result) => res.status(202).json(result))
            .catch(handleError(res));

        })
        .catch(handleError(res));

    })
    .catch(handleError(res));
}

export function music(req, res, next){

    User.findById({_id : req.user.id})
    .then((user) => {
        res.status(202).json(user.like);
    })
    .catch(handleError(res));
}
