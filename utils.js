"use strict";
var path = require('path');

function thisFile() {
  var thisFilePathArray = process.argv[1].split(path.sep);
  return thisFilePathArray[thisFilePathArray.length - 1];
}

function printKeyboardMap(stdKbd, mapKbd) {
  var str;
  for (var i = 0; i < 4; i += 1) {
    str = '';
    for (var j = 0; j < 10; j += 1) {
      str += stdKbd[i][j] + ' ';
    }

    str += '  |   ';
    for (j = 0; j < 10; j += 1) {
      str += mapKbd[i][j] + ' ';
    }

    console.log(str);
  }
  console.log('');
}

module.exports.thisFile = thisFile;
module.exports.printKeyboardMap = printKeyboardMap;
