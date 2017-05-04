'use strict';

import Comment from './comment.model';
import * as handle from '../handle';

export function index(req, res, next){

    let boardId = req.params.boardId;

    Comment.find({boardId}).exec()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch(handle.handleError(res));
}

export function update(req, res, next){

    Comment.findById({_id : req.params.commentId})
    .then((comment) => {

        Object.assign(comment, req.body).save()
        .then(handle.handleSuccess(res))
        .catch(handle.handleError(res));

    })
    .catch(handle.handleError(res));
}


export function create(req, res, next){

    let newComment = new Comment(req.body);

    newComment.save()
    .then(handle.handleSuccess(res))
    .catch(handle.handleError(res));
}


export function destroy(req, res, next){

    let id = req.params.commentId

    Comment.remove({_id : id})
    .then(handle.handleSuccess(res))
    .catch(handle.handleError(res));
}
