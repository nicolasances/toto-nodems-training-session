var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/SessionConverter');
var totoEventPublisher = require('toto-event-publisher');

var MongoClient = mongo.MongoClient;

/**
 * Updates a session.
 * Typically used to complete a session.
 */
exports.do = function(request) {

  var sessionId = request.params.id;
  var data = request.body;
  var cid = request.headers['x-correlation-id'];

  return new Promise((success, failure) => {

    if (data.completed != null && data.completed && data.finishedAt == null) {failure({code: 400, message: 'Missing "finishedAt" in the body: this is a mandatory field when completing a session.'}); return};

    // Save the new session and trigger the event
    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // 1. Convert the data
      let updateStatement = converter.converter.updateSession(data);

      // 2. Insert the data
      db.db(config.dbName).collection(config.collections.sessions)
                          .updateOne({_id: new mongo.ObjectId(sessionId)}, updateStatement)
                          .then((err, res) => {

        db.close();

        // Success
        success({});

        // Post event
        totoEventPublisher.publishEvent('trainingSessionsCompleted', {
          correlationId: cid,
          sessionId: sessionId
        });

      });
    });
  });

}
