var debug = require('debug')('file-reader');

function organizer(arrFiles) {
  var fs = require('fs'),
    result = {},
    extension = process.argv[3] || "ticket",
    fileName;

  for (var i = 0; i < arrFiles.length; i++) {
    fileName = process.argv[2] + "/" + arrFiles[i];

    if (fileName.indexOf(extension) > -1) {
      result[fileName] = {};

      result[fileName].content = fs.readFileSync(fileName, "utf8");
      result[fileName].lines = result[fileName].content.split('\n');
    } else {
      debug(fileName + " not contains the valid file extension: " + extension);
      debug("You can change the extension for all your files passing as the second value for the program.");
    }
  }

  return result;
}

exports.organize = organizer;
