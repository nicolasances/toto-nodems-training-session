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
      startedAt: moment().tz('Europe/Rome').format('HH:mm'),
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
      pain: data.postWorkoutPain,
      startedAt: data.startedAt, // format is HH:mm
      finishedAt: data.finishedAt, // format is HH:mm
      timeInMinutes: data.timeInMinutes == null ? 50 : data.timeInMinutes,
      muscles: data.muscles
    }
  },

  /**
   * Updates the session
   */
  updateSession: (data) => {

    if (data == null) return {};

    let upd = {};

    if (data.completed != null) upd.completed = data.completed;
    if (data.completed) upd.finishedAt = moment().tz('Europe/Rome').format('HH:mm');
    if (data.startedAt != null) upd.startedAt = data.startedAt;
    if (data.finishedAt != null) upd.finishedAt = data.finishedAt;
    if (data.timeInMinutes != null) upd.timeInMinutes = data.timeInMinutes;
    if (data.postWorkoutPain != null) upd.postWorkoutPain = data.postWorkoutPain;
    if (data.postWorkoutFatigue != null) upd.postWorkoutFatigue = data.postWorkoutFatigue;

    // Muscles
    // Required: an array [{muscle: <musclename>, pain: <painlevel as integer>}]
    if (data.muscles != null) upd.muscles = data.muscles;

    return {$set: upd};

  }

}
