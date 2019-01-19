var mongo = require('mongodb');
var config = require('../../config');
var converter = require('../../conv/ExConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(eId, body) {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.exercises)
                          .updateOne({_id: new mongo.ObjectId(eId)}, converter.update(body))
                          .then((err, result) => {

        db.close();

        success({});

      });
    });
  });

}
