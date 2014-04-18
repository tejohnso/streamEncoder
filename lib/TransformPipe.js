"use strict";
module.exports = function(mapArr) {
  var util = require('util');
  var stream = require('stream');
  var Transform = stream.Transform;

  function KeyMapTransform(options) {
    if (!(this instanceof KeyMapTransform)) {
      return new KeyMapTransform(options);
    }
    Transform.call(this, options);
  }

  util.inherits(KeyMapTransform, Transform);

  KeyMapTransform.prototype._transform = function(chunk) {
    var index;
    for (var i = 0, j = chunk.length; i < j; i += 1) {
      index = chunk[i];
      this.push(mapArr[index] || String.fromCharCode(index));
    }
  };

  return new KeyMapTransform();
};
