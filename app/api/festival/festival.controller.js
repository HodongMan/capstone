'use strict';

import Festival from './festival.model';
import * as handle from '../handle';
import path from 'path';
import multer from 'multer';

export function index(req, res, next){

    Festival.find({}).exec()
    .then((result) => {

        if(!result){
            res.status(handle.handleError(res));
        }

        res.status(200).json(result);
    })
    .catch(handle.handleError(res));
}

export function show(req, res, next){

    let id = req.params.festivalId;

    Festival.findOne({_id : id})
    .then((festival) => {

        if(!festival){
            res.status(handle.handleError(res));
        }

        res.status(200).json(festival);
    })
    .catch(handle.handleError(res));

}

export function update(req, res, next){

    Festival.findById({_id : req.params.festivalId})
    .then((festival) => {


        if(!festival){
            res.status(handle.handleError(res));
        }


        Object.assign(festival, req.body).save()
        .then(handle.handleSuccess(res))
        .catch(handle.handleError(res));

    })
    .catch(handle.handleError(res));
}


export function create(req, res, next){

    let newFestival = new Festival(req.body);

    newFestival.save()
    .then(handle.handleSuccess(res))
    .catch(handle.handleError(res));
}


export function destroy(req, res, next){

    let id = req.params.festivalId

    Festival.remove({_id : id})
    .then(handle.handleSuccess(res))
    .catch(handle.handleError(res));
}

export function imgUpload(req, res, next){
    console.log(path.normalize(__dirname + '/../../../img'));

    /*
    upload(req, res, function(err){
        if(err){
            return res.json(err);
        }
        res.json({message : "upload"});
    });

    */
}

const storage = multer.diskStorage({

    destination : function(req, file, callback){
        console.log(path.normalize(__dirname + '/../../../img'));
        callback(null, path.normalize(__dirname + '/../../../img'));
    },

    filename : function(req, file, callback){
        Festival.findOne({_id : id});
        callback(null, Date.now() + file.originalname);
    }
});

const upload = multer({storage : storage}).single('UploadFile');
