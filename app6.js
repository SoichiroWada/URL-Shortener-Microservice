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

app.get('/new/:longURL', function (req, res, next) {

  var longURL = req.params.longURL;
  console.log(longURL);
  //Check to see if passed in url is in correct form
  var regex =/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

  var LongURLValidity = 0;
  regex.test(longURL) === true ? LongURLValidity = 1 : console.log('URL is invalid');
  console.log(regex.test(longURL));
  console.log('LongURLValidity: '),console.log(LongURLValidity);

  var urlParameter = 0;

  ShortURL.findOne({ originalURL: longURL }, function ( err, result) {
    if (err) throw err;
    if ( result !== null ) {
      urlP = 1;
    }
    console.log(result);
  });

      console.log('urlParameter: '), console.log(urlParameter);

  if( LongURLValidity === 1 && urlParameter === 0 ){
    var newURL = Math.floor(Math.random()*100000).toString();
    // console.log(short);
        //Create object to send to the database
    var data = new ShortURL(
        {
            originalURL: longURL,
            shorterURL: newURL
        }
    );
    //Saves to database and throws error message if it fails
    data.save( function (err) {
      if (err) {
        res.send('Error saving to database');
      } else {
        console.log('data saved !');
      }
    });
    res.json(data);
  }
  else if( LongURLValidity === 1 && urlParameter === 1 ){
    ShortURL.findOne({ originalURL: longURL }, function ( err, result) {
      if (err) throw err;
      res.json(result);
      console.log(result);
    });
  }
  next();
});
/*
//Query database and forward to url
app.get('/:urlToForward', function (res, req, next) {
      //Stores the value of param
  var urlToForward = res.params.urlToForward;

  ShortURL.findOne({'urlToForward': urlToForward}, function (err,data) {
    if (err) {
      res.send("This shorterURL does not exist.");
    }
    else {
      res.redirect(301, data.originalUrl);
    }
    response.end();
  });

  res.redirect('https://www.google.com');
});
*/


//Listen to see if everything is working and launching properly locally or on heroku
app.listen( process.env.PORT || 3000, function () {
    console.log('Listening to port 3000');
});
