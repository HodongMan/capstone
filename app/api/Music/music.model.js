'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

let MusicSchema = new Schema({

    user : {
        type : String,
        required : true,
    },

    title : {
        type : String,
        required : true,
    },

    content : {
        type : String,
        required : true,
    },

    singer : {
        type : String,
        required : true,
    },
    
});


export default mongoose.model("Music", MusicSchema);
