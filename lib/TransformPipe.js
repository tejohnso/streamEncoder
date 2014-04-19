"use strict";
module.exports = function(mapArr) {
  var util = require('util');
  var stream = require('stream');
  var Transform = stream.Transform;

  function KeyMapTransform() {
    if (!(this instanceof KeyMapTransform)) {
      return new KeyMapTransform();
    }
    Transform.call(this);
  }

  util.inherits(KeyMapTransform, Transform);

  KeyMapTransform.prototype._transform = function(chunk, enc, cb) {
    var index, output = '';
    for (var i = 0, j = chunk.length; i < j; i += 1) {
      index = chunk[i];
      output += (mapArr[index] || String.fromCharCode(index));
    }
    this.push(output);
    cb();
  };

  return new KeyMapTransform();
};
