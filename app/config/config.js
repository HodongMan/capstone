'use strict';

export default {
    options : {
      server : {socketOptions : {keepAlive : 1, connectTimeoutMS : 30000}},
      replset : {socketOptions : {keepAlive : 1, connectTimeoutMS : 30000}}
    }
}
