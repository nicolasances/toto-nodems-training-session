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

      if (filters.sort == 'date') options.sort.push(['date', filters.sortDir == 'desc' ? 'descending' : 'ascending']);

      // ----------------------------------------------------
      // Filtering
      // ----------------------------------------------------
      // Filter per workoutId
      let workoutFilter = {};
      if (filters.wid != null) {

        workoutFilter = {
          '$or': [
            {workoutId: filters.wid},
            {'workouts.workoutId': filters.wid}
          ]
        };
      }

      // Filtering per date
      let dateFilter = {};
      if (filters.date != null) dateFilter = {date: filters.date};

      // Filtering per dateFrom
      let dateFromFilter = {};
      if (filters.dateFrom != null) dateFromFilter = {date: {$gte: filters.dateFrom}};

      filter = {$and: [workoutFilter, dateFilter, dateFromFilter]};

      // ----------------------------------------------------
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
