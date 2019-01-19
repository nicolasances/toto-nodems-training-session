// Documentation Generator for the API
exports.do = () => {
  return new Promise((success, failure) => {
    success({
      name: 'Training Sessions',
      desc: 'This API provides access to the training sessions. A training session is a moment spent training. There can be multiple sessions per day.',
      paths: [
        {method: 'GET', path: '/sessions', desc: 'Get the list of training sessions.', query: [
          'sort': 'Field on which to sort',
          'sortDir': 'Direction of the sorting (desc or asc)'
        ]},
        {method: 'POST', path: '/sessions', desc: 'Post a new training session.'},
        {method: 'GET', path: '/sessions/:sessionId', desc: 'Retrieve a specific session (by id).'},
        {method: 'DELETE', path: '/sessions/:sessionId', desc: 'Deletes a specific session (by id).'}
      ]
    });
  })
}
