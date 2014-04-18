"use strict";
module.exports = function generateMappedBoard(directives) {
  var iterateBoard = require('./utils.js').iterateBoard
     ,mapKbd = require('./standardKeyboard')()
     ,workBoard = [[],[],[],[]];

  directives.split(',').map(function(val) {
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
    updateMapBoard();
  });

  return mapKbd;

  function hFlip() {
    iterateBoard(function(i, j) {
      workBoard[i][9 - j] = mapKbd[i][j];
    });
  }

  function vFlip() {
    iterateBoard(function(i, j) {
      workBoard[3 - i][j] = mapKbd[i][j];
    });
  }

  function shift(count) {
    count = count % 40;
    if (!Number(count)) {return;}

    iterateBoard(function(i, j) {
      var currentPosition = i * 10 + j
         ,newPosition = currentPosition + count;

      if (newPosition > 39) {
        newPosition = newPosition - 40;
      } else if (newPosition < 0) {
        newPosition = newPosition + 40;
      }
      workBoard[Math.floor(newPosition / 10)][newPosition % 10] = mapKbd[i][j];
    });
  }


  function updateMapBoard() {
    iterateBoard(function(i, j) {
      mapKbd[i][j] = workBoard[i][j];
    });
  }
};
