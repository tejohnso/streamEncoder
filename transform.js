"use strict";
var fs = require('fs');
var path = require('path');
var util = require('util');
var stream = require('stream');
var stdKbd = require('./standardKeyboard');
var usageText = "Usage: node " + thisFile() + " transform-file data-file [--showmap]";
var mapKbd = generateMappedBoard(stdKbd);
var mapArr = [];

if (mapKbd[0].length === 0) {return -1;}

if (process.argv[4] === '--showmap') {
  printKeyboardMap();
}

for (var i = 0; i < 4; i += 1) {
  for (var j = 0; j < 10; j += 1) {
    mapArr[stdKbd[i][j].charCodeAt(0)] = mapKbd[i][j];
  }
}

var Transform = stream.Transform;

function KeyMap(options) {
  if (!(this instanceof KeyMap)) {
    return new KeyMap(options);
  }
  Transform.call(this, options);
}

util.inherits(KeyMap, Transform);
KeyMap.prototype._transform = function(chunk) {
  var index;
  for (var i = 0, j = chunk.length; i < j; i += 1) {
    index = chunk[i];
    if (mapArr[index]) {
      this.push(mapArr[index]);
    } else {
      this.push(String.fromCharCode(index));
    }
  }
};

var KeyMap = new KeyMap();
KeyMap.pipe(process.stdout);
var dataStream = fs.createReadStream(process.argv[3]);
dataStream.on('error', function(e) {
  console.log("Error " + e.code + " on accessing file "  + e.path + "\n");
  console.log(usageText);
});

dataStream.pipe(KeyMap);
return;

function thisFile() {
  var thisFile = process.argv[1].split(path.sep);
  return thisFile[thisFile.length - 1];
}

function printKeyboardMap() {
  var str;
  for (var i = 0; i < 4; i += 1) {
    str = '';
    for (var j = 0; j < 10; j += 1) {
      str += stdKbd[i][j] + ' ';
    }

    str += '  |   ';
    for (j = 0; j < 10; j += 1) {
      str += mapKbd[i][j] + ' ';
    }

    console.log(str);
  }
  console.log('');
}


function generateMappedBoard(stdKbd) {
  var directives = getTransformDirectives()
     ,mapKbd = [[],[],[],[]]
     ,shiftingBoard = [[],[],[],[]];

  if (directives === '') {return mapKbd;}

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
      console.log(usageText);
      return '';
    }

    try {
      return fs.readFileSync(process.argv[2], {"encoding": "ascii"});
    } catch (e) {
      console.log("Error " + e.code + " on " + e.syscall + " of " + e.path + "\n");
      console.log(usageText);
      return '';
    }
  }
}

