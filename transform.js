"use strict";
var fs = require('fs')
   ,mappingDirectives
   ,mapArr = []
   ,usageText = require('./lib/utils').usageText
   ,streamTransformer
   ,dataStream;

try {
  mappingDirectives = require('./lib/readDirectives');
} catch(e) {
  console.error(e + '\n' + usageText);
  return -1;
}

mappingDirectives = mappingDirectives.split(',').map(function(val) {
  return val.trim().toUpperCase().replace('\n','');
});
mapArr = require('./lib/mappedKeyboard')(mappingDirectives);

streamTransformer = require('./lib/TransformPipe')(mapArr);
streamTransformer.pipe(process.stdout);
dataStream = fs.createReadStream(process.argv[3]);
dataStream.on('error', function(e) {
  console.log("Error " + e.code + " on accessing file "  + e.path + "\n" + usageText);
  return -1;
});

dataStream.pipe(streamTransformer);
return;
