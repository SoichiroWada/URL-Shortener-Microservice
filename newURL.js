
module.exports.alphaGen = function () {
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var newArray = [];
  var newString = "";
  for (var i = 0; i < 5; i++ ) {
    var position = Math.floor(Math.random()*10000) % 52;
    var alphaSelected = alphabet[position];
    newArray.push(alphaSelected);
    console.log(newArray);
  }
  return newString = newArray.join('');
};
