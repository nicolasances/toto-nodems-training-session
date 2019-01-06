var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/SessionConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(id) {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.sessions)
                          .find({_id: new mongo.ObjectId(id)})
                          .toArray(function(err, array) {

        db.close();

        if (array == null || array.length == 0) {
          success({});
          return;
        }

        success(converter.converter.sessionTO(array[0]));

      });
    });
  });

}
