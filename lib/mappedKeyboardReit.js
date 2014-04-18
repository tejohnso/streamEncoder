"use strict";
var printKeyboardMap = require('./lib/utils').printKeyboardMap;

module.exports = function generateMappedBoard(directives) {
  var iterateBoard = require('./utils.js').iterateBoard
     ,mapKbd = require('./standardKeyboard')()
     ,workBoard = [[],[],[],[]]
     ,mapArr;

  directives.forEach(function(val) {
    switch (val) {
      case 'H':
        hFlip();
        break;
      case 'V':
        vFlip();
        break;
      default:
        shift(val);
        break;
    }

    if (process.argv[4] && process.argv[4].substr(0,6) === '--show') {
      printKeyboardMap(mapKbd, workBoard);
    }

    updateMapBoard();
  });

  iterateBoard(function(i, j) {
    mapArr[require('./standardKeyboard')()[i][j].charCodeAt(0)] = mapKbd[i][j];
  });

  return mapArr;

  function hFlip() {
    console.log('hFlip');
    iterateBoard(function(i, j) {
      if (i === 1 && j === 1) {
        console.log(i + ',' + j + '[' + (workBoard[i][j] || '') + ']->' + i + ',' + (9 - i) + '[' + mapKbd[i][9 - i] + ']' );
      }
      workBoard[i][j] = mapKbd[i][9 - j];
    });
  }

  function vFlip() {
    iterateBoard(function(i, j) {
      workBoard[i][j] = mapKbd[3 - i][j];
    });
  }

  function shift(count) {
    count = count % 40;
    if (!Number(count)) {return;}
    console.log('shifting ' + count);

    iterateBoard(function(i, j) {
      var currentPosition = i * 10 + j
         ,newPosition = currentPosition - count;

      if (newPosition > 39) {
        newPosition = newPosition - 40;
      } else if (newPosition < 0) {
        newPosition = newPosition + 40;
      }
      if (i === 1 && j === 1) {
        console.log(i + ',' + j + '[' + (workBoard[i][j] || '') + ']->' + Math.floor(newPosition / 10) + ',' + newPosition % 10 + '[' + mapKbd[Math.floor(newPosition / 10)][newPosition % 10] + ']');
      }
      workBoard[i][j] = mapKbd[Math.floor(newPosition / 10)][newPosition % 10];
    });
  }

  function updateMapBoard() {
    iterateBoard(function(i, j) {
      mapKbd[i][j] = workBoard[i][j];
    });
  }
};
