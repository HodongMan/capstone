'use strict';

import Music from './music.model';
import * as handle from '../handle';

export function index(req, res, next){

    Music.find({}).exec()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch(handle.handleError(res));
}

export function user(req, res, next){

    Music.find({}).exec()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch(handle.handleError(res));
}

export function show(req, res, next){

    let id = req.params.musicId;

    Music.findOne({_id : id})
    .then((music) => {
        res.status(200).json(music);
    })
    .catch(handle.handleError(res));

}

export function update(req, res, next){

    Music.findById({_id : req.params.musicId})
    .then((music) => {

        Object.assign(music, req.body).save()
        .then(handle.handleSuccess(res))
        .catch(handle.handleError(res));

    })
    .catch(handle.handleError(res));
}


export function create(req, res, next){

    let newMusic = new Music(req.body);

    newMusic.save()
    .then(handle.handleSuccess(res))
    .catch(handle.handleError(res));
}


export function destroy(req, res, next){

    let id = req.params.MusicId

    Music.remove({_id : id})
    .then(handle.handleSuccess(res))
    .catch(handle.handleError(res));
}
