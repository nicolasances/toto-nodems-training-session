var moment = require('moment-timezone');

exports.converter = {

  /**
   * Creates the persistent object from a JSON object
   */
  sessionPO: function(data) {

    let sessionDate = moment(data.date, 'YYYYMMDD').tz('Europe/Rome');

    return {
      date: data.date,
      workouts: data.workouts,
      completed: false,
      year: parseInt(sessionDate.format('YYYY')),
      week: parseInt(sessionDate.format('WW')),
      score: 0 // legacy - TODO to be removed when removing /gym
    };
  },

  /**
   * Creates the transfer object from the PO
   */
  sessionTO: function(data) {

    if (data == null) return {};

    return {
      id: data._id,
      date: data.date,
      workouts: data.workouts,
      completed: data.completed,
      year: data.year,
      week: data.week
    }
  }

}
