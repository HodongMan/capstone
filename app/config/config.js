'use strict';

export default {
    url : 'mongodb://hodong:wkdghehd@hodong-shard-00-00-7jdx5.mongodb.net:27017,hodong-shard-00-01-7jdx5.mongodb.net:27017,hodong-shard-00-02-7jdx5.mongodb.net:27017/fiesta?ssl=true&replicaSet=Hodong-shard-0&authSource=admin',
    options : {
      server : {socketOptions : {keepAlive : 1, connectTimeoutMS : 30000}},
      replset : {socketOptions : {keepAlive : 1, connectTimeoutMS : 30000}}
    }
}
