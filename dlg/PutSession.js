var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/SessionConverter');
var totoEventPublisher = require('toto-event-publisher');
var validator = require('./val/PutSessionValidator')

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

    console.log('Received request');

    // Validate
    let validationResult = validator.do(request);

    console.log(validationResult);

    if (validatonResult.code == 400) {failure(validationResult); return;}

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

        // Post event, in case the session has been completed
        if (data.completed) {

          totoEventPublisher.publishEvent('trainingSessionsCompleted', {
            correlationId: cid,
            sessionId: sessionId
          });
        }

      });
    });
  });

}
