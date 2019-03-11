var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/SessionConverter');
var totoEventPublisher = require('toto-event-publisher');

var MongoClient = mongo.MongoClient;

exports.do = function(req) {

  var id = req.params.id;
  var cid = req.headers['x-correlation-id'];

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.sessions)
                          .deleteOne({_id: new mongo.ObjectId(id)}, function(err, doc) {

        db.close();

        success({});

        // Post event
        let event = {
          correlationId: cid,
          sessionId: id
        };

        totoEventPublisher.publishEvent('trainingSessionsDeleted', event);

      });
    });
  });

}
