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

    let workouts = [];

    // Old sessions admitted a single workout per session
    if (data.workoutId != null) workouts.push({planId: data.planId, workoutId: data.workoutId});
    // while new sessions admit more workouts per session
    else workouts = data.workouts;

    return {
      id: data._id,
      date: data.date,
      workouts: workouts,
      completed: data.completed,
      year: data.year,
      week: data.week,
      fatigue: data.postWorkoutFatigue,
      pain: data.postWorkoutPain
    }
  }

}
