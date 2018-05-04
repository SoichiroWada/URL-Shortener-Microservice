var Promise = require('promise');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ShortURL');
var db = mongoose.connection;
const ShortURL = require('./models/shortURL');
const newURLGen = require("./newURL.js");
console.log(newURLGen.alphaGen());

app.use(bodyParser.json());
app.use(cors());
//app.use(express.static(__dirname + '/public'));
app.use(express.static('./public'));

app.get('/:longURL', function (req, res, next) {

  var longURL = req.params.longURL;
  console.log(longURL);
  var regexp =/[a-zA-Z]{5}/i;

  if ( regexp.test(longURL) === true && longURL.length === 5 ) {
    ShortURL.findOne({ shorterURL: longURL}, function (err, result) {
      if (err) {
        res.send("This shorterURL does not exist !");
      }
      else if ( Boolean(result) === false ) {
        res.send("This shorterURL does not exist !!!");
      }
      else {
        console.log('result:'), console.log(result);
        var url = 'https://www.'+result.originalURL;
        console.log('url:'), console.log(url);
        res.redirect(url);
      }
    });
  }
  else {
    //Check to see if passed in url is in correct form
    var reg =/^www\./i;
    var found = longURL.match(reg);

    if (Boolean(found)) {
      longURL = longURL.substring(4);
    }
    console.log(longURL);

    var regex =/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
    var LongURLValidity = 0
    console.log(regex.test(longURL));

    if (regex.test(longURL) === false) {
      console.log('URL is invalid');
      var data = new ShortURL(
          {
              originalURL: longURL,
              shorterURL: 'error'
          }
      );
      console.log('No saving to database');
      res.json(data);
    }
    else if ( regex.test(longURL) === true ) {
      var LongURLValidity = 1;
    }
    console.log('regex.test(longURL):'), console.log(regex.test(longURL));
    console.log('LongURLValidity:'),console.log(LongURLValidity);

    ShortURL.findOne({ originalURL: longURL }, function ( err, result) {
      if (err) throw err;
      console.log('query result:'), console.log(result);
      if ( Boolean(result) === true ) {
        if( LongURLValidity === 1 ){
          res.json(result);
        }
      }
      else if ( Boolean(result) === false ) {
        if( LongURLValidity === 1 ){
          //generate new short URL
          var newURL = newURLGen.alphaGen();
          //var newURL = Math.floor(Math.random()*100000).toString();
          var data = new ShortURL(
              {
                  originalURL: longURL,
                  shorterURL: newURL
              }
          );
          data.save( function (err) {
            if (err) {
              res.send('Error in saving to database');
            } else {
              console.log('New URL data is saved !');
            }
          });
          res.json(data);
        }
      }
    })
  }
});
/*
app.get('/:urlToForward', function ( req, res, next ) {

  var urlToForward = req.params.urlToForward;
  console.log('urlToForward:'), console.log(urlToForward);

  ShortURL.findOne({ shorterURL: urlToForward}, function (err, result) {
    if (err) {
      res.send("This shorterURL does not exist !");
    }
    else if ( Boolean(result) === false ) {
      res.send("This shorterURL does not exist !!!");
    }
    else {
      console.log('result:'), console.log(result);
      var url = 'https://www.'+result.originalURL;
      console.log('url:'), console.log(url);
      res.redirect(url);
      next();
    }
  });
});
*/
//Listen to see if everything is working and launching properly locally or on heroku
app.listen( process.env.PORT || 8000, function () {
    console.log('Listening to port 8000');
});
