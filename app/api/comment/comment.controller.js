'use strict';

import Comment from './comment.model';
import * as handle from '../handle';

export function index(req, res, next){

    let boardId = req.params.boardId;

    Comment.find({boardId}).exec()
    .then((result) => {

        if(!result){
            res.status(handle.handleError(res));
        }

        res.status(200).json(result);
    })
    .catch(handle.handleError(res));
}

export function update(req, res, next){

    Comment.findById({_id : req.params.commentId})
    .then((comment) => {

        if(!comment){
            res.status(handle.handleError(res));
        }

        Object.assign(comment, req.body).save()
        .then(handle.handleSuccess(res))
        .catch(handle.handleError(res));

    })
    .catch(handle.handleError(res));
}

export function user(req, res, next){

    let user = req.params.user;

    Comment.find({
        user,
    })
    .then((comment) => {

        if(!comment){
            res.status(handle.handleError(res));
        }

        res.status(202).json(comment);
    })
    .catch(handle.handleError(res));
}


export function create(req, res, next){

    let newComment = new Comment(req.body);
    newComment.boardId = req.params.boardId;

    newComment.save()
    .then(comment => res.status(202).json(comment))
    .catch(handle.handleError(res));
}


export function destroy(req, res, next){

    let id = req.params.commentId

    Comment.remove({_id : id})
    .then(handle.handleSuccess(res))
    .catch(handle.handleError(res));
}
