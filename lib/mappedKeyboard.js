"use strict";
var printKeyboardMap = require('./utils').printKeyboardMap;

module.exports = function generateMappedBoard(directives) {
  var iterateBoard = require('./utils.js').iterateBoard
     ,stdKbd = require('./standardKeyboard')()
     ,mapKbd = [[],[],[],[]]
     ,mapArr = [];

  iterateBoard(function(i, j) {
    var rowCol = [i, j];
    directives.forEach(function(val) {
      switch (val) {
        case 'H':
          hFlip(rowCol);
          break;
        case 'V':
          vFlip(rowCol);
          break;
        default:
          shift(val, rowCol);
          break;
      }
    });
    mapKbd[i][j] = stdKbd[rowCol[0]][rowCol[1]];
    mapArr[stdKbd[i][j].charCodeAt(0)] = mapKbd[i][j];
  });

  if (require('./flags').showMap) {
    printKeyboardMap(stdKbd, mapKbd);
  }

  return mapArr;

  function hFlip(rowCol) {
    rowCol[1] = 9 - rowCol[1];
  }

  function vFlip(rowCol) {
    rowCol[0] = 3 - rowCol[0];
  }

  function shift(count, rowCol) {
    var currentPosition, newPosition;
    if (!Number(count)) {return;}
    count = count % 40;

    currentPosition = rowCol[0] * 10 + rowCol[1];
    newPosition = currentPosition + count;

    if (newPosition > 39) {
      newPosition = newPosition - 40;
    } else if (newPosition < 0) {
      newPosition = newPosition + 40;
    }

    rowCol[0] = Math.floor(newPosition / 10);
    rowCol[1] = newPosition % 10;
  }
};
