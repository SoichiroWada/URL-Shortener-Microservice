const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ShortURL');
const ShortURL = require('./models/shortURL');
//const urlGen = require('./test');

app.use(bodyParser.json());
app.use(cors());

//app.use(express.static(__dirname + '/public'));
app.use(express.static('./public'));

var longURL = 'www.facebook.com';
var URLExistence;

ShortURL.findOne({ originalURL: longURL }, function ( err, result) {
  if (err) throw err;
  if ( result !== null ) {
    URLExistence = 1;
  }
  console.log(result);
  console.log('URLExistence1: '), console.log(URLExistence);
});
  console.log('URLExistence2: '), console.log(URLExistence);
/*
app.get('/new/:longURL', function (req, res, next) {

  var longURL = req.params.longURL;
  console.log(longURL);
  //Check to see if passed in url is in correct form
  var regex =/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

  var LongURLValidity = 0;
  regex.test(longURL) === true ? LongURLValidity = 1 : console.log('false');
  console.log('LongURLValidity: '),console.log(LongURLValidity);

  var URLExistence = 0;

  ShortURL.findOne({ originalURL: longURL }, function ( err, result) {
    if (err) throw err;
    result === true ? URLExistence = 1 : URLExistence = 0;
    console.log('URLExistence: '), console.log(URLExistence);
  });

  if( LongURLValidity === 1 && URLExistence === 1 ){
    ShortURL.findOne({ originalURL: longURL }, function ( err, result) {
      if (err) throw err;
      console.log(result);
    });
  }

  next();

});

*/
//Listen to see if everything is working and launching properly locally or on heroku
app.listen( process.env.PORT || 3000, function () {
    console.log('Listening to port 3000');
});
