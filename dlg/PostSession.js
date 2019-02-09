var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/SessionConverter');
var totoEventPublisher = require('toto-event-publisher');

var MongoClient = mongo.MongoClient;

/**
 * Posting a session consists in starting a session with some specified workout plans.
 * This class only receives the request to start a session, will save an empty session and will
 * send an event that a session has been started.
 * Requires the body to be an {
 *  date:     'YYYYMMDD' date of the session
 *  workouts: [{}, {
 *      planId:     Id of the plan to start
 *      workoutId:  Id of the workout to start
 *      }
 *  ]
 * }
 */
exports.do = function(request) {

  var data = request.body;

  return new Promise((success, failure) => {

    // Validation
    if (data.date == null) {failure({code: 400, message: 'Missing "date" in the body: date in which the session has to start.'}); return};
    if (data.workouts == null || data.workouts.length == 0) {failure({code: 400, message: 'Missing "workouts" field. Please pass the workouts to start.'}); return;}

    // Validate each workout's data
    for (var i = 0; i < data.workouts.length; i++) {

      if (data.workouts[i].planId == null) {failure({code: 400, message: 'Missing "planId" field in workout.'}); return;}
      if (data.workouts[i].workoutId == null) {failure({code: 400, message: 'Missing "workoutId" field in workout.'}); return;}
    }

    // Save the new session and trigger the event
    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // 1. Convert the data
      let po = converter.converter.sessionPO(data);

      // 2. Insert the data
      db.db(config.dbName).collection(config.collections.sessions)
                          .insertOne(po, function(err, res) {

        db.close();

        // Get Id
        let id = res.insertedId;

        // Post event
        let event = {
          correlationId: request.headers['x-correlation-id'],
          sessionId: id,
          date: data.date,
          workouts: data.workouts
        };

        totoEventPublisher.publishEvent('trainingSessionsCreated', event);

        // Success
        success({id: id});

      });
    });
  });

}
