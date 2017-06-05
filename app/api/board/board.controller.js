'use strict';

import Board from './board.model';
import * as handle from '../handle';
import multer from 'multer';
import path from 'path';


export function index(req, res, next){

    Board.find({}, null, {sort : '-date'}).exec()
    .then((board) => {

        if(!board){
            res.status(handle.handleError(res));
        }

        res.status(200).json(board);
    })
    .catch(handle.handleError(res))
}

export function show(req, res, next){

    let id = req.params.boardId;

    Board.findOne({_id : id})
    .then((board) => {

        if(!board){
            res.status(handle.handleError(res));
        }

        res.status(200).json(board);
    })
    .catch(handle.handleError(res));
}

export function festival(req, res, next){

    let id = req.params.fesitvalId;

    Board.find({type : id}, null, {sort : '-date'})
    .then((board) => {

        if(!board){
            res.status(handle.handleError(res));
        }

        res.status(200).json(board);
    })
    .catch(handle.handleError(res));

}


export function festivalAndTag(req, res, next){

    let id = req.params.fesitvalId;
    let tag = req.params.tag;

    Board.find({
        type : id,
        tag : tag,
    }, null, {sort : '-date'})
    .then((board) => {

        if(!board){
            res.status(handle.handleError(res));
        }

        res.status(200).json(board);
    })
    .catch(handle.handleError(res));

}

export function user(req, res, next){

    let user = req.params.user;

    Board.find({
        user,
    }, null, {sort : '-date'})
    .then((board) => {

        if(!board){
            res.status(handle.handleError(res));
        }

        res.status(202).json(board);
    })
    .catch(handle.handleError(res));
}
export function create(req, res, next){


    let newBoard = new Board(req.body);
    newBoard.user = req.user.name;

    newBoard.save()
    .then((board) => {
        res.status(202).json(board);
    })
    .catch(handle.handleError(res));
}

export function update(req, res, next){

    Board.findById({_id : req.params.boardId})
    .then((board) => {

        if(board.user === req.user.name){

            Object.assign(board, req.body).save()
            .then(handle.handleSuccess(res))
            .catch(handle.handleError(res));
        }
    })
    .catch(handle.handleError(res));
}


export function destroy(req, res, next){

    let id = req.params.boardId;
    let user = req.user.name
    Board.remove({
        _id : id,
        user,
    })
    .then(handle.handleSuccess(res))
    .catch(handle.handleError(res));
}

export function search(req, res, next){

    let searchText = req.params.search;

    Board.find({$text : {$search : searchText}}).exec()
    .then((result) => res.status(202).json(result))
    .catch(handle.handleError(res));

}


const storage = multer.diskStorage({

    destination : (req, file, cb) => {
        cb(null, path.resolve(__dirname , '../../../img/'));
    },
    filename : (req, file, cb) => {
        file.uploadedFile = {
            name : req.user.name + Date.now(),
            ext : file.mimetype.split('/')[1]
        };

        cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
    },
});

export const upload = multer({storage,}).array('UploadFile');

export function image(req, res, next){
    let newFileName = "http://ec2-52-79-215-229.ap-northeast-2.compute.amazonaws.com/";

    let fileNameList = [];

    req.files.forEach((item, index) => {

        fileNameList.push(newFileName + item.filename);
    });

    Board.findById({_id : req.params.boardId})
    .then((board) => {
        if(!board){
            return res.status(401).json({message : "Not user", statusCode : 0});
        }

        board.img = fileNameList;

        board.save()
        .then((board) => {
            res.status(202).json({
                img : board.img,
            });
        })
        .catch((error) => handle.handleError(res));
    })
    .catch(handle.handleError(res));

}
