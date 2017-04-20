'use strict';

import Festival from './festival.model';
import * as handle from '../handle';

export function index(req, res, next){

    return Festival.find({}).exec()
    .then((result) => {
        console.log(handle);
        res.status(200).json(result);
    })
    .catch(handle.handleError);
}

export function show(req, res, next){

    let id = req.params.festivalId;

    Festival.findOne({id})
    .then((board) => {
        res.status(200).json(board);
    })
    .catch(handle.handleError);

}


export function create(req, res, next){

    let newBoard = new Board(req.body);

    newBoard.save()
    .then(handle.handleSuccess)
    .catch(handle.handleError);
}


export function destroy(req, res, next){

    let id = req.params.festivalId

    Festival.remove({id})
    .then(handle.handleSuccess)
    .catch(handle.handleError);
}
