'use strict';


import cheerio from 'cheerio';
import request from 'request';


import MusicRank from './musicrank.model';
import * as handle from '../handle';


function isLiked(name, listItem)
{
    let number = listItem.indexOf(name);

    if(number >= 0){
        return 1;
    }else{
        return 0;
    }
}


export function update (req, res, next){

    let url = 'https://www.genie.co.kr/chart/genre?ditc=D&ymd=20170522&genrecode=E0000';

    request(url, (err, response, html) => {

        if(err){
            return res.status(402).json(err);
        }else{
            const $ = cheerio.load(html);
            const parent = $('#body-content .list-wrap');
            let MusicList = [];

            for(let i = 1; i <= 50; i++){

                const musicArea = parent.children('.rank-' + i).children('.music-info').children('.music_area').children('.music');
                let albumcover = "http:" + parent.children('.rank-' + i).children('.music-info').children('.album').children('a').children('img').attr("src");
                let title = musicArea.children('.title').html();
                let artist = musicArea.children('.meta').children('.artist').html();
                let albumtitle = musicArea.children('.meta').children('.albumtitle').html();

                let newData = {
                    rank : String(i),
                    title,
                    artist,
                    albumtitle,
                    albumcover,
                };
                MusicList.push(newData);
            }

            MusicRank.remove()
            .then((result) => {
                MusicRank.insertMany(MusicList)
                .then((result) => res.status(202).json(result))
                .catch(handle.handleError(res));
            })
            .catch(handle.handleError(res));

        }
    });

}

export function video(req, res, next){
    let videoQuery = req.params.artist + req.params.title;
    let newVideoQuery = videoQuery.split(" ").join("+");
    let url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA9ZLVAgLKnHP1281N9n_KtQhSRP-jTKe4&part=snippet&maxResults=1&q=" + newVideoQuery;

    request(url, (err, response, html) => {

        if(err){
            return res.status(402).json(err);
        }else{
            let newJson = JSON.parse(html);
            let videoId = newJson.items[0].id.videoId;

            return res.status(202).json({videoId,});
        }
    });
}

export function index(req, res, next){

    MusicRank.find({})
    .then((result) => {

        result.forEach((elem, index) => {
            let like = isLiked(req.user.name, elem.like)
            result[index].like = like;
        });

        res.status(202).json(result);
    })
    .catch(handle.handleError(res));
}

export function test(req, res, next){

    MusicRank.find({})
    .then((result) => {
        res.status(202).json(result);
    })
    .catch(handle.handleError(res));
}

export function like(req, res, next){

    let id = req.params.musicrankId;
    MusicRank.findById({_id : id})
    .then((musicrank) => {

        musicrank.like.push(req.user.name);

        musicrank.save()
        .then((result) => res.status(202).json(result))
        .catch(handle.handleError(res));
    })
    .catch(handle.handleError(res));
}

export function my(req, res, next){

    let user = req.user.name;

    MusicRank.find({like : user}, null, {sort : '-date'}).exec()
    .then((result) => {
        if(!result){
            return handle.handleError(res);
        }

        return res.status(202).json(result);
    })
    .catch(handle.handleError(res));

}

export function likeMusic(req, res, next){

    let user = req.params.name;

    MusicRank.find({like : user}, null, {sort : '-date'}).exec()
    .then((result) => {
        if(!result){
            return handle.handleError(res);
        }

        return res.status(202).json(result);
    })
    .catch(handle.handleError(res));

}

export function unlike(req, res, next){

    let id = req.params.musicrankId;
    MusicRank.findById({_id : id})
    .then((musicrank) => {

        let index = musicrank.like.indexOf(req.user.name);
        musicrank.like.splice(index, 1);

        console.log(musicrank);

        musicrank.save()
        .then((result) => res.status(202).json(result))
        .catch(handle.handleError(res));
    })
    .catch(handle.handleError(res));
}
