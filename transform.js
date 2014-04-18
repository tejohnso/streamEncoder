"use strict";
var fs = require('fs');
var path = require('path');
var util = require('util');
var stdKbd = generateKeyboard();
var mapKbd = generateMappedBoard(stdKbd);

var mapArr = [];
showBoard(stdKbd);
util.print('\n' + fs.readFileSync(process.argv[2],'ascii'));
showBoard(mapKbd);

function showBoard(kbd) {
  var str = '';
  for (var i = 0; i < 4; i += 1) {
    console.log('\n');
    for (var j = 0; j < 10; j += 1) {
      str = '00' + kbd[i][j] + ' ';
      util.print(str.substr(str.length - 4));
    }
  }
}

console.log('\n');
for (var i = 0; i < 4; i += 1) {
  for (var j = 0; j < 10; j += 1) {
    mapArr[stdKbd[i][j]] = mapKbd[i][j];
  }
}

mapArr.forEach(function(val, idx) {util.print(idx + '->' + val + ',');});
util.print('\n');

function generateKeyboard() {
  var kbd = [];
  kbd[0] = [49,50,51,52,53,54,55,56,57,48];
  kbd[1] = [113,119,101,114,116,121,117,105,111,112];
  kbd[2] = [97,115,100,102,103,104,106,107,108,59];
  kbd[3] = [122,120,99,118,98,110,109,44,46,47];
  return kbd;
}

function generateMappedBoard(stdKbd) {
  var directives = getTransformDirectives()
     ,mapKbd = [[],[],[],[]]
     ,shiftingBoard = [[],[],[],[]];

  if (directives === '') {return;}

  for (var i = 0; i < 4; i += 1) {
    for (var j = 0; j < 10; j += 1) {
      mapKbd[i][j] = stdKbd[i][j];
    }
  }

  directives.split(',').map(function(val) {
    switch (val) {
      case 'H':
        h();
        break;
      case 'V':
        v();
        break;
      default:
        s(val);
        break;
    }
  });

  return mapKbd;

  function h() {
    shiftMapKeyboard(function(i, j) {
      shiftingBoard[i][9 - j] = mapKbd[i][j];
    });
  }

  function v() {
    shiftMapKeyboard(function(i, j) {
      shiftingBoard[3 - i][j] = mapKbd[i][j];
    });
  }

  function s(count) {
    count = count % 40;
    if (!Number(count)) {return;}

    shiftMapKeyboard(function(i, j) {
      var currentPosition = i * 10 + j
         ,newPosition = currentPosition + count;

      if (newPosition > 39) {
        newPosition = newPosition - 40;
      } else if (newPosition < 0) {
        newPosition = newPosition + 40;
      }
      shiftingBoard[Math.floor(newPosition / 10)][newPosition % 10] = mapKbd[i][j];
    });

  }

  function shiftMapKeyboard(fn) {
    for (var i = 0; i < 4; i += 1) {
      for (var j = 0; j < 10; j += 1) {
        fn(i, j);
      }
    }

    for (var m = 0; m < 4; m += 1) {
      for (var n = 0; n < 10; n += 1) {
        mapKbd[m][n] = shiftingBoard[m][n];
      }
    }
  }

  function getTransformDirectives() {
    var thisFile = process.argv[1].split(path.sep);
    thisFile = thisFile[thisFile.length - 1];
    if (process.argv.length < 4) {
      console.log("Usage: node " + thisFile + " [transform file] [data file]");
      return '';
    }

    try {
      return fs.readFileSync(process.argv[2], {"encoding": "ascii"});
    } catch (e) {
      console.log("Error " + e.code + " on " + e.syscall + " of " + e.path + "\n");
      return '';
    }
  }
}

function generateMappingArray() {
}

generateMappingArray();

