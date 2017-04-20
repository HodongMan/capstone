'use strict';

import Board from './board.model';
import * as handle from '../handle';


export function index(req, res, next){

    Board.find({{}).exec()
    .then((board) => {
        res.status(200).json(board);
    })
    .catch(handle.handleError)
}

export function show(req, res, next){

    let id = req.params.boardId;

    Board.findOne({id})
    .then((board) => {
        res.status(200).json(board);
    })
    .catch(handle.handleError)
}

export function create(req, res, next){

    let newBoard = new Board(req.body);

    newBoard.save()
    .then(handle.handleSuccess)
    .catch(handle.handleError);
}


export function destroy(req, res, next){

    let id = req.params.boardId;

    Board.remove({id})
    .then(handle.handleSuccess)
    .catch(handle.handleError);
}
