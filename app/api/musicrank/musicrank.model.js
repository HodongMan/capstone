'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

let MusicRankSchema = new Schema({

    rank : {
        type : String,
        required : true,
    },

    title : {
        type : String,
        required : true,
    },

    artist : {
        type : String,
        required : true,
    },

    albumtitle : {
        type : String,
        required : true,
    },

    albumcover : {
        type : String,
        required : true,
    },

    like : [{
        type : String,
        unique : true,
    }],

});


export default mongoose.model("MusicRank", MusicRankSchema);
