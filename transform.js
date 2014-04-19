"use strict";
var mappingDirectives
   ,mapArr = []
   ,streamTransformer
   ,dataStream;

mappingDirectives = getDirectivesFromFile();
if (mappingDirectives instanceof Error) {return;}

mapArr = setMapArray();

dataStream = setReadStream();

streamTransformer = require('./lib/TransformPipe')(mapArr);

dataStream.pipe(streamTransformer).pipe(process.stdout);
return 0;

function getDirectivesFromFile() {
  try {
    return require('./lib/mappingDirectives');
  } catch(e) {
    console.error(e + '\n' + require('./lib/utils').usageText);
    return e;
  }
}

function setMapArray() {
  if (require('./lib/flags').compoundDirectives) {
    return require('./lib/mappedKeyboardCompounding')(mappingDirectives);
  } else {
    return require('./lib/mappedKeyboard')(mappingDirectives);
  }
}

function setReadStream() {
  var dataStream = require('fs').createReadStream(process.argv[3]);
  dataStream.on('error', function(e) {
    console.log("Error " + e.code + " on accessing file " +
                e.path + "\n" + require('./lib/utils').usageText);
  });
  return dataStream;
}
