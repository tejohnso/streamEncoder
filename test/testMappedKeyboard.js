/* This is a roughed in test for the mappedKeyboard.js file 
 * Using the example inputs, it will confirm that the mapping
 * matches the expected output.
 *
 * This doesn't properly test the full program.  All the piping and file
 * handling is not addressed here.
 */
"use strict";
var fs = require('fs')
   ,mapArr = []
   ,mappingDirectives
   ,output = ''
   ,expectedResult
   ,input
   ,mapVal
   ,failLog;

for (var i = 1; i < 5; i += 1) {
  failLog = '';
  output = '';
  failLog += '--- ' + i + ' ---\n';
  expectedResult = fs.readFileSync('result' + i + '.txt', 'ascii');

  mappingDirectives = fs.readFileSync('directives' + i + '.txt', 'ascii').split(',');
  mappingDirectives = mappingDirectives.map(removeCR);

  mapArr = require('../lib/mappedKeyboard')(mappingDirectives);

  input = fs.readFileSync('data' + i + '.txt');

  for (var m = 0, n = input.length; m < n; m += 1) {
    mapVal = mapArr[input[m]];
    output += (mapVal || String.fromCharCode(input[m]));
  }

  if (output !== expectedResult) {
    failLog += 'input ' + input;
    failLog += 'output ' + output;
    failLog += 'expected ' + expectedResult;
    failLog += '---------';
    console.log(failLog);
  }
}

function removeCR(val) {
  return val.replace('\n','');
}

