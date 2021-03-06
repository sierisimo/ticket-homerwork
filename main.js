var fs = require("fs"),
  debug = require('debug')('main'),
  filesPromise = new Promise(function(resolve, reject) {
    if (process.argv.length < 3) {
      reject("You should pass an argument to the program")
    } else {
      fs.readdir(process.argv[2], function(err, files) {
        if (err) reject(err);
        resolve(files);
      });
    }
  });

filesPromise.then(require('./tools/fileReader').organize)
  .then(function(filesData) {
    var parser = require('./tools/parser').parse,
      parsedData = {};

    for (var data in filesData) {
      parsedData[data] = parser(filesData[data]);
    }

    return parsedData;
  }).then(require('./tools/validator').validateTickets)
  .then(require('./tools/db').insertTickets)
  .then(function() {
    debug("Everything worked fine... the data is storing now...");
  })
  //.then(require('./tools/db').getInfoTickets)
  .catch(function(err) {
    debug("Error happend");
    console.error(err);
  });
