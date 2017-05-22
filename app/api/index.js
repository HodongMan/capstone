import express from 'express';
import path from 'path';

import User from './user';
import Board from './board';
import Festival from './festival';
import Comment from './comment';
import Music from './music';
import MusicRank from './musicrank';

export default function(app){

    app.use("/api/user", User);
    app.use("/api/board", Board);
    app.use("/api/festival", Festival);
    app.use("/api/comment", Comment);
    app.use("/api/music", Music);
    app.use("/api/rank", MusicRank);

    app.route("*").get((req, res) => {
        res.status(200).send({
            message : "Server Started"
        })
    });
};
