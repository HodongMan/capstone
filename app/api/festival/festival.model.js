'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';


let FestivalSchema = new Schema({

    title : {
        type : String,
        required : true,
    },

    content : {
        type : String,
        required : true,
    },

    img : [String],

    icon : String,

    date : {
        type : Date,
        default : Date.now
    },

    startDate : String,

    endDate : String,

    location : String,

    user : String,

    vedio : String,

    active : Boolean,

});

export default mongoose.model('Festival', FestivalSchema);
