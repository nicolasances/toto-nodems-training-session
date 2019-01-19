var moment = require('moment-timezone');

exports.converter = {

  /**
   * Creates the persistent object from a JSON object
   */
  exPO: function(data) {

    if (data.type == 'single') return single(data);
    else if (data.type == 'dropset') return dropset(data);
    else if (data.type == 'striping') return striping(data);
    else if (data.type == 'superset') return superset(data);
    else if (data.type == 'hourglass') return hourglass(data);

    return null;
  },

  /**
   * Creates the transfer object from the PO
   */
  exTO: function(data) {

    if (data == null) return {};

    var to = {};

    if (data.type == 'single') to = single(data);
    else if (data.type == 'dropset') to = dropset(data);
    else if (data.type == 'striping') to = striping(data);
    else if (data.type == 'superset') to = superset(data);
    else if (data.type == 'hourglass') to = hourglass(data);

    to.id = data._id;

    return to;
  }

}

var single = (data) => {
  return {
      planId: data.planId,
      workoutId: data.workoutId,
      sessionId: data.sessionId,
      type: data.type,
      benchmarkExerciseId: data.benchmarkExerciseId,
      name: data.name,
      sets: data.sets,
      reps: data.reps,
      weight: data.weight
  }
}

var superset = (data) => {
  return {
      planId: data.planId,
      workoutId: data.workoutId,
      sessionId: data.sessionId,
      type: data.type,
      ex1: {name: data.ex1.name, benchmarkExerciseId: data.ex1.benchmarkExerciseId, sets: data.ex1.sets, reps: data.ex1.reps, weight: data.ex1.weight},
      ex2: {name: data.ex2.name, benchmarkExerciseId: data.ex2.benchmarkExerciseId, sets: data.ex2.sets, reps: data.ex2.reps, weight: data.ex2.weight}
  }
}

var dropset = (data) => {
  return {
      planId: data.planId,
      workoutId: data.workoutId,
      sessionId: data.sessionId,
      type: data.type,
      benchmarkExerciseId: data.benchmarkExerciseId,
      name: data.name,
      sets: data.sets,
      reps1: data.reps1,
      reps2: data.reps2,
      weight1: data.weight1,
      weight2: data.weight2
  }
}

var striping = (data) => {
  return {
      planId: data.planId,
      workoutId: data.workoutId,
      sessionId: data.sessionId,
      type: data.type,
      benchmarkExerciseId: data.benchmarkExerciseId,
      name: data.name,
      sets: data.sets,
      reps1: data.reps1,
      reps2: data.reps2,
      reps3: data.reps3,
      weight1: data.weight1,
      weight2: data.weight2,
      weight3: data.weight3
  }
}

var hourglass = (data) => {
  return {
      planId: data.planId,
      workoutId: data.workoutId,
      sessionId: data.sessionId,
      type: data.type,
      benchmarkExerciseId: data.benchmarkExerciseId,
      name: data.name,
      sets: data.sets,
      weight1: data.weight1,
      weight2: data.weight2,
      weight3: data.weight3
  }
}
