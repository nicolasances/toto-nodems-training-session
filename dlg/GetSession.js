var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/SessionConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(id) {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.sessions)
                          .findOne({_id: new mongo.ObjectId(id)}, function(err, doc) {

                            console.log(err);
                            console.log(doc);

        db.close();

        success(converter.converter.sessionTO(doc));

      });
    });
  });

}
