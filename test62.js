const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ShortURL');
const ShortURL = require('./models/shortURL');
const newURLGen = require("./newURL.js");
console.log(newURLGen.alphaGen());

app.use(bodyParser.json());
app.use(cors());
//app.use(express.static(__dirname + '/public'));
app.use(express.static('./public'));

app.get('/:urlToForward', (req, res, next)=>{
    //Stores the value of param
var shorterURL = req.params.urlToForward;
ShortURL.findOne({'shorterURL': shorterURL}, (err,data)=>{
  if (err) {
            res.send("This shorterURL does not exist.");
       }
         else {
            res.redirect(data.originalURL);
        }
         response.end();
});

res.redirect('https://www.google.com');
});

/*
//Query database and forward to url
app.get('/:urlToForward', function ( req, res, next ) {

  if


  var urlToForward = req.params.urlToForward;
  console.log('urlToForward:'), console.log(urlToForward);

  ShortURL.findOne({ shorterURL: urlToForward}, function (err, result) {
    if (err) {
      res.send("This shorterURL does not exist !");
    }
    else {
      console.log('result:'), console.log(result);
      var url = 'https://www.'+result.originalURL;
      console.log('url:'), console.log(url);
      res.redirect(url);
    }

    var url = data.originalURL;
    return res.redirect(url);
    response.end();

  });
    //res.redirect(url);
});
*/

app.listen( 4000, function () {
    console.log('Listening to port 4000');
});
