
/**
 * Validates the data passed to the PUT /sessions/:id/muscles/muscle method.
 */
exports.do = (req) => {

  let body = req.body;
  let muscle = req.params.mid;

  if (body == null) return {code: 400, message: 'No body passed'};
  if (muscle == null) return {code: 400, message: 'No "muscle" passed in the path. Should be PUT /sessions/:id/muscles/:muscle'};

  // Muscle validaton
  if (body.painLevel == null) return {code: 400, message: 'No "painLevel" field passed in the body'};
  if (!Number.isInteger(body.painLevel)) return {code: 400, message: '"painLevel" value should be an integer. Was ' + body.painLevel};
  if (body.painLevel < 0 || body.painLevel > 3) return {code: 400, message: '"painLevel" should be between 0 and 3 (included). Was ' + body.painLevel};

  return {code: 200};

}
