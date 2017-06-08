'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

let MusicSchema = new Schema({


    videoId : {
        type : String,
        required : true,
        unique : true,
    },

    title : {
        type : String,
        required : true,
    },

    thumbnail : {
        type : String,
        required : true,
    },

    viewCount : {
        type : Number,
        required : true,
    },

    likeCount : {
        type : Number,
        required : true,
    },
});


export default mongoose.model("Music", MusicSchema);
