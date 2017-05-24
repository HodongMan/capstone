'use strict';


import cheerio from 'cheerio';
import request from 'request';


import MusicRank from './musicrank.model';
import * as handle from '../handle';


export function index (req, res, next){

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
                    title,
                    artist,
                    albumtitle,
                    albumcover,
                };
                MusicList.push(newData);
            }

            return res.status(202).json(MusicList);
        }
    });

}
