"use strict";
var fs = require('fs');
var stdKbd = require('./lib/standardKeyboard')();
var mapKbd;
var mappingDirectives;
var mapArr = [];
var printKeyboardMap = require('./lib/utils').printKeyboardMap;
var thisFile = require('./lib/utils').thisFile;
var usageText = "Usage: node " + thisFile() + " transform-file data-file [--showmap]";
var streamTransformer;
var dataStream;

try {
  mappingDirectives = require('./lib/readDirectives')();
} catch(e) {
  console.error(e + '\n' + usageText);
  return -1;
}

mapKbd = require('./lib/mappedKeyboard')(mappingDirectives);

if (process.argv[4] && process.argv[4].substr(0,6) === '--show') {
  printKeyboardMap(stdKbd, mapKbd);
}

require('./lib/utils').iterateBoard(function(i, j) {
  mapArr[stdKbd[i][j].charCodeAt(0)] = mapKbd[i][j];
});

streamTransformer = require('./lib/TransformPipe')(mapArr);
streamTransformer.pipe(process.stdout);
dataStream = fs.createReadStream(process.argv[3]);
dataStream.on('error', function(e) {
  console.log("Error " + e.code + " on accessing file "  + e.path + "\n" + usageText);
});

dataStream.pipe(streamTransformer);
return;
