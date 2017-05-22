'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';


let CommentSchema = new Schema({

    user : {
        type : String,
        required : true,
    },

    boardId : {
        type : String,
        required : true,
    },

    content : {
        type : String,
        required : true,
    },

    date : {
        type : Date,
        default : Date.now
    }

});

export default mongoose.model("Comment", CommentSchema);
