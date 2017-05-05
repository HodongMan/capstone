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

    img : String,

    icon : String,

    date : {
        type : Date,
        default : Date.now
    },

    user : String,

    active : Boolean,

});

export default mongoose.model('Festival', FestivalSchema);
