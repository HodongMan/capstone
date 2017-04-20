'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import * as auth from '../../auth/auth';

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

    date : {
        type : Date,
        default : Date.now
    },

    user : String,

    active : Boolean,

});

export default mongoose.model('Festival', FestivalSchema);
