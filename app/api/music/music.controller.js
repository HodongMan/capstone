'use strict';

import request from 'request';

import Music from './music.model';
import * as handle from '../handle';

export function index(req, res, next){

    Music.find({}, null, {sort : '-likeCount'}).exec()
    .then((result) => {

        if(!result){
            res.status(handle.handleError(res));

        }
        res.status(200).json(result);
    })
    .catch(handle.handleError(res));
}

export function update(req, res, next){

    Music.findById({_id : req.params.musicId})
    .then((music) => {

        if(!music){
            res.status(handle.handleError(res));
        }

        Object.assign(music, req.body).save()
        .then((music) => {
            res.status(202).json(music);
        })
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

export function videoSearch(req, res, next){

    let videoId = req.params.videoId;
    let url = "https://www.googleapis.com/youtube/v3/videos?id=" + videoId + "&key=AIzaSyA9ZLVAgLKnHP1281N9n_KtQhSRP-jTKe4%20&fields=items(id,snippet(title,thumbnails),statistics)&part=snippet,statistics";

    request(url, (err, response, html) => {

        if(err){
            return res.status(402).json(err);
        }else{

            let newJson = JSON.parse(html);
            let videoId = newJson.items[0].id;
            let title = newJson.items[0].snippet.title;
            let thumbnail = newJson.items[0].snippet.thumbnails.default.url;
            let viewCount = newJson.items[0].statistics.viewCount;
            let likeCount = newJson.items[0].statistics.likeCount;

            let newMusic = {
                videoId,
                title,
                thumbnail,
                viewCount,
                likeCount,
            };

            Music.findOneAndUpdate(
                {videoId,}, // find a document with that filter
                newMusic, // document to insert when nothing was found
                {upsert: true, new: true, runValidators: true
            }) // options
            .then((result) => res.status(202).json(result))
            .catch(handle.handleError(res));
        }
    });

}
