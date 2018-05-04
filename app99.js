const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shortURL = require('./models/shortURL')

app.use(bodyParser.json());
app.use(cors());
//mongoose.connect('mongodb://localhost/ninjago');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortURLs');

app.use(express.static(__dirname + '/public'));

app.get('/new/:urlToShorten(*)', function (req, res, next) {

  var urlToShorten = req.params.urlToShorten;
  //var { urlToShorten } = req.params;
  var expression =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = expression;
  console.log('urlToShorten');
  if (regex.test(urlToShorten) === true) {
    res.json({urlToShorten});
  }
  else {
    res.json({urlToShorten: 'Failed'});
  }
})

app.listen(process.env.PORT || 3000, function(){
  console.log('listening to the port 3000')
})
