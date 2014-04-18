"use strict";
var fs = require('fs');
var stdKbd = require('./standardKeyboard');
var mapKbd;
var mapArr = [];
var thisFile = require('./utils').thisFile;
var printKeyboardMap = require('./utils').printKeyboardMap;
var usageText = "Usage: node " + thisFile() + " transform-file data-file [--showmap]";
var streamTransformer;
var dataStream;

try {
  mapKbd = generateMappedBoard(stdKbd);
} catch(e) {
  console.error(e + '\n' + usageText);
  return -1;
}

if (process.argv[4] === '--showmap') {
  printKeyboardMap(stdKbd, mapKbd);
}

for (var i = 0; i < 4; i += 1) {
  for (var j = 0; j < 10; j += 1) {
    mapArr[stdKbd[i][j].charCodeAt(0)] = mapKbd[i][j];
  }
}

streamTransformer = require('./TransformPipe')(mapArr);
streamTransformer.pipe(process.stdout);
dataStream = fs.createReadStream(process.argv[3]);
dataStream.on('error', function(e) {
  console.log("Error " + e.code + " on accessing file "  + e.path + "\n" + usageText);
});

dataStream.pipe(streamTransformer);
return;



function generateMappedBoard(stdKbd) {
  var directives
     ,mapKbd = [[],[],[],[]]
     ,shiftingBoard = [[],[],[],[]];

  try {
    directives = getTransformDirectives();
  } catch(e) {
    throw e;
  }

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
    if (process.argv.length < 4) {
      throw Error('Insufficient arguments');
    }

    try {
      return fs.readFileSync(process.argv[2], {"encoding": "ascii"});
    } catch (e) {
      throw Error(e.code + " on " + e.syscall + " file " + e.path);
    }
  }
}

