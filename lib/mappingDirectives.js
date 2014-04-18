"use strict";
var fs = require('fs');

module.exports = getMappingDirectives();

function getMappingDirectives() {
  var directives;
  if (process.argv.length < 4) {
    throw new Error('Insufficient arguments');
  }

  try {
    directives = fs.readFileSync(process.argv[2], {"encoding": "ascii"});
  } catch (e) {
    throw new Error(e.code + " on " + e.syscall + " file " + e.path);
  }

  return directives.split(',').map(function(val) {
    return val.trim().toUpperCase().replace('\n','');
  });
}
