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

    album : {
        type : String,
        required : true,
    },

});


export default mongoose.model("MusicRank", MusicRankSchema);
