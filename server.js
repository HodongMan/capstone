import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import api from './app/api';

const app = express();
const port = process.env.PORT || 3000;

const options = {
  server : {socketOptions : {keepAlive : 1, connectTimeoutMS : 30000}},
  replset : {socketOptions : {keepAlive : 1, connectTimeoutMS : 30000}}
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/capstone', options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error : '));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(express.static(__dirname + '/client/dist'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


api(app);


app.listen(port);
console.log(`listening on port ${port}`);
