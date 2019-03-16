
/**
 * Validates the data passed to the PUT /sessions/:id method.
 */
exports.do = (req) => {

  let body = req.body;

  if (body == null) return {code: 400, message: 'No body passed'};

  // Muscles validaton
  // If passed, should be [{muscle: <musclename>, pain: <painlevel as integer>}]
  if (body.muscles != null) {
    // Should be an array
    if (!Array.isArray(body.muscles)) return {code: 400, message: '"muscles" field should be an []. Was: ' + body.muscles};
    // Should contain values
    if (body.muscles.length == 0) return {code: 400, message: '"muscles" array should contain values. Was empty.'};
    // Each element should be {muscle, pain} where pain is optional but integer from 0 to 3
    for (var i = 0; i < body.muscles.length; i++) {
      if (body.muscles[i].muscle == null) return {code: 400, message: '"muscles" array elements should contain a field "muscle"'};
      if (body.muscles[i].pain != null && !Number.isInteger(body.muscles[i].pain)) return {code: 400, message: '"muscles" array elements "pain" value should be an integer. Was ' + body.muscles[i].pain};
      if (body.muscles[i].pain != null && (body.muscles[i].pain < 0 || body.muscles[i].pain > 3)) return {code: 400, message: '"muscles" array elements "pain" value should be between 0 and 3. Was ' + body.muscles[i].pain};
    }
  }

  return {code: 200};

}
