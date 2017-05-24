'use strict';

import Board from './board.model';
import * as handle from '../handle';


export function index(req, res, next){

    Board.find({}).exec()
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

    Board.find({type : id})
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
    })
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
    })
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

    newBoard.save()
    .then((board) => {
        res.status(202).json(board);
    })
    .catch(handle.handleError(res));
}

export function update(req, res, next){

    Board.findById({_id : req.params.boardId})
    .then((board) => {

        Object.assign(board, req.body).save()
        .then(handle.handleSuccess(res))
        .catch(handle.handleError(res));

    })
    .catch(handle.handleError(res));
}


export function destroy(req, res, next){

    let id = req.params.boardId;

    Board.remove({_id : id})
    .then(handle.handleSuccess(res))
    .catch(handle.handleError(res));
}
