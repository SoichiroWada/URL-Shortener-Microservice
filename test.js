//console.log(process.env);

//console.log('The value of PORT is:', process.env.PORT);


//var urlValue = Math.floor(Math.random()*100000).toString();
//console.log(urlValue);

var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
//console.log(alphabet.length);

var newArray = [];

var gen = function () {
  var position = Math.floor(Math.random()*100) % 26;
  var alpha = alphabet[position];
  newArray.push(alpha);
  console.log(newArray);
}

for (var i = 0; i < 5; i++ ) {
  gen();
}

var newString = newArray.join('');
//console.log(newString);

module.exports = newString;

/*
abcde
fghij
klmno
pqrst
uvwxy
z
*/
