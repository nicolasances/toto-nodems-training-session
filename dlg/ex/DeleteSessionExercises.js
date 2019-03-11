var mongo = require('mongodb');
var config = require('../../config');

var MongoClient = mongo.MongoClient;

/**
 * Deletes all the exercises of a specified session
 */
exports.do = function(request) {

  var sid = request.params.id;

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.exercises)
                          .deleteMany({sessionId: sid})
                          .then((err, result) => {

        db.close();

        success({});

      });
    });
  });

}
