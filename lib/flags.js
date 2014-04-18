var flags = {"showMap": false, "compoundDirectives": false};

for (var i = 4, j = process.argv.length; i < j; i += 1) {
  if (process.argv[i].substr(0,6) === '--show') {
    flags.showMap = true;
  }
  if (process.argv[i].substr(0,6) === '--comp') {
    flags.compoundDirectives = true;
  }
}

module.exports = flags;
