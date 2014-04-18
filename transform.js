"use strict";
var fs = require('fs')
   ,mappingDirectives
   ,mapArr = []
   ,streamTransformer
   ,dataStream;

try {
  mappingDirectives = require('./lib/mappingDirectives');
} catch(e) {
  console.error(e + '\n' + require('./lib/utils').usageText);
  return -1;
}

if (require('./lib/flags').compoundDirectives) {
  mapArr = require('./lib/mappedKeyboardCompounding')(mappingDirectives);
} else {
  mapArr = require('./lib/mappedKeyboard')(mappingDirectives);
}

dataStream = fs.createReadStream(process.argv[3]);
dataStream.on('error', function(e) {
  console.log("Error " + e.code + " on accessing file " + 
              e.path + "\n" + require('./lib/utils').usageText);
  return -1;
});

streamTransformer = require('./lib/TransformPipe')(mapArr);
streamTransformer.pipe(process.stdout);

dataStream.pipe(streamTransformer);
return;
