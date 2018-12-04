var moment = require('moment-timezone');

exports.sessionConverter = {

  /**
   * Creates the persistent object
   */
  sessionPO: function(data) {

    let sessionDate = moment(data.date, 'YYYYMMDD').tz('Europe/Rome');

    return {
      date: data.date,
      planId: data.planId,
      workouts: data.workouts,
      completed: false,
      year: parseInt(sessionDate.format('YYYY')),
      week: parseInt(sessionDate.format('WW')),
      score: 0 // legacy - TODO to be removed when removing /gym
    };
  }

  /**
   * Creates the transfer object from the PO
   */
  sessionTO: function(data) {

    return {
      date: data.date,
      planId: data.planId,
      workouts: data.workouts,
      completed: data.completed,
      year: data.year,
      week: data.week
    }
  }

}
