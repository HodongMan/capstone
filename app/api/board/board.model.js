'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

let BoardSchema = new Schema({

    type : {
        type : String,
        default : "",
    },

    tag : {
        type : String,
        defaut : "",
    },

    title : {
        type : String,
        required : true,
    },

    content : {
        type : String,
        required : true,
    },

    user : {
        type : String,
        required : true,
    },

    date : {
        type : Date,
        default : Date.now,
    },

    img : [String],

});

export default mongoose.model('Board', BoardSchema);