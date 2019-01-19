var mongo = require('mongodb');
var config = require('../../config');
var converter = require('../../conv/ExConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(req) {

  var id = req.eid;

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.exercises)
                          .findOne({_id: new mongo.ObjectId(id)}, function(err, doc) {

        db.close();

        success(converter.converter.exTO(doc));

      });
    });
  });

}
