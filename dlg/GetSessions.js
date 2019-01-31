var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/SessionConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(request) {

  var filters = request.query;

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Filter definition
      let filter = {};
      let options = {};

      // Sorting
      options.sort = [];

      if (filters.sort == 'date') options.sort.push(['date', filters.sortDir == 'desc' ? 'descending' : 'asc']);

      // Filtering
      // Filter per workoutId
      let workoutFilter = {};
      if (filters.workoutId != null) {

        workoutFilter = {
          '$or': [
            workoutId: filters.workoutId,
            'workouts.workoutId': filters.workoutId
          ]
        };
      }

      filter = workoutFilter;

      // Max results
      if (filters.maxResults != null) options.limit = parseInt(filters.maxResults);

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.sessions)
                          .find(filter, options)
                          .toArray(function(err, array) {

        db.close();

        if (array == null) {
          success({});
          return;
        }

        var sessions = [];
        for (var i = 0; i < array.length; i++) {
          sessions.push(converter.converter.sessionTO(array[i]));
        }

        success({sessions: sessions});

      });
    });
  });

}
