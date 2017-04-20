'use strict';

module.exports = {
    url : 'mongodb://localhost/capstone',
    options : {
      server : {socketOptions : {keepAlive : 1, connectTimeoutMS : 30000}},
      replset : {socketOptions : {keepAlive : 1, connectTimeoutMS : 30000}}
    }
}
