"use strict";
var fs = require('fs');
var stdKbd = require('./standardKeyboard')();
var mapKbd;
var mappingDirectives = require('./readDirectives');
var mapArr = [];
var thisFile = require('./utils').thisFile;
var printKeyboardMap = require('./utils').printKeyboardMap;
var usageText = "Usage: node " + thisFile() + " transform-file data-file [--showmap]";
var streamTransformer;
var dataStream;

try {
  mappingDirectives = mappingDirectives();
} catch(e) {
  console.error(e + '\n' + usageText);
  return -1;
}

mapKbd = require('./mappedKeyboard')(mappingDirectives);

if (process.argv[4] && process.argv[4].substr(0,6) === '--show') {
  printKeyboardMap(stdKbd, mapKbd);
}

require('./utils').iterateBoard(function(i, j) {
  mapArr[stdKbd[i][j].charCodeAt(0)] = mapKbd[i][j];
});

streamTransformer = require('./TransformPipe')(mapArr);
streamTransformer.pipe(process.stdout);
dataStream = fs.createReadStream(process.argv[3]);
dataStream.on('error', function(e) {
  console.log("Error " + e.code + " on accessing file "  + e.path + "\n" + usageText);
});

dataStream.pipe(streamTransformer);
return;
