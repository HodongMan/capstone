'use strict';

import Festival from './festival.model';
import * as handle from '../handle';

export function index(req, res, next){

    Festival.find({}).exec()
    .then((result) => {
        console.log(handle);
        res.status(200).json(result);
    })
    .catch(handle.handleError(res));
}

export function show(req, res, next){

    let id = req.params.festivalId;

    Festival.findOne({_id : id})
    .then((board) => {
        res.status(200).json(board);
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
