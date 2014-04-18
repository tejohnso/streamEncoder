"use strict";
var path = require('path');

function thisFile() {
  var thisFilePathArray = process.argv[1].split(path.sep);
  return thisFilePathArray[thisFilePathArray.length - 1];
}

function printKeyboardMap(stdKbd, mapKbd) {
  var str;
  console.log('');
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

function iterateBoard(fn) {
  for (var i = 0; i < 4; i += 1) {
    for (var j = 0; j < 10; j += 1) {
      fn(i, j);
    }
  }
}

module.exports.usageText = "Usage: node " + thisFile() +
                           " transform-file data-file [--showmap]";
module.exports.printKeyboardMap = printKeyboardMap;
module.exports.iterateBoard = iterateBoard;
