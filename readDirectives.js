"use strict";
var fs = require('fs');

module.exports = function getMappingDirectives() {
  if (process.argv.length < 4) {
    throw new Error('Insufficient arguments');
  }

  try {
    return fs.readFileSync(process.argv[2], {"encoding": "ascii"});
  } catch (e) {
    throw new Error(e.code + " on " + e.syscall + " file " + e.path);
  }
};
