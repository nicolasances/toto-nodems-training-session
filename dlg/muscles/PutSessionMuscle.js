var mongo = require('mongodb');
var config = require('../../config');
var validator = require('../val/PutSessionMuscleValidator');
var totoEventPublisher = require('toto-event-publisher');

var MongoClient = mongo.MongoClient;

/**
 * Updates a single muscle setting
 */
exports.do = function(request) {

  var sessionId = request.params.id;
  var muscle = request.params.mid;
  var body = request.body;
  var cid = request.headers['x-correlation-id'];

  return new Promise(function(success, failure) {

    // Validate
    let validationResult = validator.do(request);

    if (validationResult.code == 400) {failure(validationResult); return;}

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.sessions)
                          .updateOne( {_id: new mongo.ObjectId(sessionId), "muscles.muscle": muscle},
                                      {$set: {"muscles.$.painLevel": body.painLevel}} )
                          .then((result) => {

        db.close();

        success({sessionId: sessionId, muscle: muscle, result: result, body: request.body});

        // Publish the event
        totoEventPublisher.publishEvent('trainingMusclePainChanged', {
          correlationId: cid,
          sessionId: sessionId,
          muscle: muscle,
          painLevel: body.painLevel
        });

      });
    });
  });

}
