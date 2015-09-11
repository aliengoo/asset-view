var mongoose = require('mongoose');

module.exports = function init(databaseUrl) {
  mongoose.connection.on('error', function (err) {
    console.log('Mongoose connections error: ' + err);
  });

  mongoose.connection.on('connected', function () {
    console.log('Connected');
  });

  mongoose.connection.on('disconnected', function () {
    console.log('Disconnected');
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected because the application terminated.');
      process.exit(0);
    });
  });

  mongoose.connect(databaseUrl);
};

