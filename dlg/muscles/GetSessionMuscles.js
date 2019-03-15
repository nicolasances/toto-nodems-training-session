var getSessionExercises = require('../ex/GetExercises');

exports.do = function(req) {

  return new Promise(function(success, failure) {

    // Retrieve the exercises of the specified session
    getSessionExercises.do(req).then((data) => {

      // Get all the muscles
      var muscles = new Set();

      // Add the muscles to the set
      for (var i = 0; i < data.exercises.length; i++) {
        muscles.add(data.exercises[i].muscleGroupId);
      }

      // Get an array out of the set
      let result = Array.from(muscles);

      success({muscles: result});

    }, failure);

  });

}
