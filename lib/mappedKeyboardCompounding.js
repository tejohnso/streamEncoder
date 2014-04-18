/* This version of the keyboard mapping results from a different interpretation
 * of the requirements.  The keyboard is shifted in its entirety on every instruction
 * and then the next instruction is carried out.
 * use this version with the --compound flag  */

"use strict";
var printKeyboardMap = require('./utils').printKeyboardMap;

module.exports = function generateMappedBoard(directives) {
  var iterateBoard = require('./utils.js').iterateBoard
     ,mapKbd = require('./standardKeyboard')()
     ,workBoard = [[],[],[],[]]
     ,mapArr = [];

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

    if (require('./flags').showMap) {
      printKeyboardMap(mapKbd, workBoard);
    }

    updateMapBoardFromWorkBoard();
  });

  iterateBoard(function(i, j) {
    mapArr[require('./standardKeyboard')()[i][j].charCodeAt(0)] = mapKbd[i][j];
  });

  return mapArr;

  function hFlip() {
    if (require('./flags').showMap) {console.log('hFlip');}
    iterateBoard(function(i, j) {
      workBoard[i][j] = mapKbd[i][9 - j];
    });
  }

  function vFlip() {
    if (require('./flags').showMap) {console.log('vFlip');}
    iterateBoard(function(i, j) {
      workBoard[i][j] = mapKbd[3 - i][j];
    });
  }

  function shift(count) {
    if (require('./flags').showMap) {console.log('shift ' + count);}
    if (!Number(count)) {return;}
    count = count % 40;

    iterateBoard(function(i, j) {
      var currentPosition = i * 10 + j
         ,newPosition = currentPosition - count;

      if (newPosition > 39) {
        newPosition = newPosition - 40;
      } else if (newPosition < 0) {
        newPosition = newPosition + 40;
      }
      workBoard[i][j] = mapKbd[Math.floor(newPosition / 10)][newPosition % 10];
    });
  }

  function updateMapBoardFromWorkBoard() {
    iterateBoard(function(i, j) {
      mapKbd[i][j] = workBoard[i][j];
    });
  }
};
