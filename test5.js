var str1 = 'www.microsoft.com';
var str2 = 'microsoft.com';
var str = 'www.google.com';
var str4 = 'www.facebook.com';

var reg =/^www\./i;
var found = str.match(reg);

console.log(found);
console.log(Boolean(found));

if (Boolean(found)) {
  longURL = str.substring(4);
}
else {
 longURL = str;
}
console.log(longURL);
