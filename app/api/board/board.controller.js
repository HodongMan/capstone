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

    let type = req.params.fesitvalType;

    Board.find({type : type})
    .then((board) => {

        if(!board){
            res.status(handle.handleError(res));
        }

        res.status(200).json(board);
    })
    .catch(handle.handleError(res));

}

export function create(req, res, next){


    let newBoard = new Board(req.body);

    newBoard.save()
    .then(handle.handleSuccess(res))
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
