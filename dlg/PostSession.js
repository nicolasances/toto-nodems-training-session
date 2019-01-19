var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/SessionConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(request) {

  var data = request.body;

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // 1. Convert the data
      let po = converter.converter.sessionPO(data);

      // 2. Insert the data
      db.db(config.dbName).collection(config.collections.sessions)
                          .insertOne(po, function(err, res) {

        db.close();

        success({id: res.insertedId});

      });
    });
  });

}
