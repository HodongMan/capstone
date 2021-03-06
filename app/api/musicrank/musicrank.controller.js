'use strict';


import cheerio from 'cheerio';
import request from 'request';


import MusicRank from './musicrank.model';
import * as handle from '../handle';
import User from '../user/user.model';

export function update (req, res, next){

    let url = 'https://www.genie.co.kr/chart/genre?ditc=D&ymd=20170608&genrecode=E0000';

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
                    title : title.replace(/&#?[a-z0-9]+;/g, ""),
                    artist : artist.replace("&amp;", ''),
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
    let url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA9ZLVAgLKnHP1281N9n_KtQhSRP-jTKe4&part=snippet&maxResults=10&q=" + newVideoQuery;

    request(url, (err, response, html) => {

        if(err){
            return res.status(402).json(err);
        }else{
            let newJson = JSON.parse(html);
            console.log(newJson);
            let searchResult = [];

            User.findById({_id : req.user.id})
            .then((user) => {

                newJson.items.forEach((item, index) => {

                    let videoId = item.id.videoId;
                    let videoTitle = item.snippet.title;
                    let videoThumbnail = item.snippet.thumbnails.default.url;
                    let isLiked = 0;
                    user.like.forEach((item, index) => {
                        if(item === null){
                            return;
                        }

                        if(item.videoId === videoId){
                            isLiked = 1;
                        }
                    });

                    let searchResultOne = {
                        videoId,
                        title : videoTitle,
                        thumbnail : videoThumbnail,
                        isLiked,
                    }
                    searchResult.push(searchResultOne);
                })

                res.status(202).json(searchResult);
            
            })
            .catch(handle.handleError(res));
        }
    });
}

export function videoSearch(req, res, next){
    let videoQuery = req.params.search;
    let url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA9ZLVAgLKnHP1281N9n_KtQhSRP-jTKe4&part=snippet&maxResults=10&q=" + videoQuery;

    request(url, (err, response, html) => {

        if(err){
            return res.status(402).json(err);
        }else{

            let newJson = JSON.parse(html);
            let searchResult = [];

            User.findById({_id : req.user._id})
            .then((user) => {


                newJson.items.forEach((item, index) => {

                    let videoId = item.id.videoId;
                    let videoTitle = item.snippet.title;
                    let videoThumbnail = item.snippet.thumbnails.default.url;
                    let isLiked = 0;
                    user.like.forEach((item, index) => {
                        if(item === null){
                            return;
                        }

                        if(item.videoId === videoId){
                            isLiked = 1;
                        }
                    });

                    let searchResultOne = {
                        videoId,
                        title : videoTitle,
                        thumbnail : videoThumbnail,
                        isLiked,
                    }
                    searchResult.push(searchResultOne);
                })

                res.status(202).json(searchResult);

            })
            .catch(handle.handleError(res));

        }
    });
}

export function index(req, res, next){

    MusicRank.find({})
    .then((result) => {

        res.status(202).json(result);
    })
    .catch(handle.handleError(res));
}
