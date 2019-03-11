var Controller = require('toto-api-controller');
var totoEventPublisher = require('toto-event-publisher');

var postSession = require('./dlg/PostSession');
var getSessions = require('./dlg/GetSessions');
var getSession = require('./dlg/GetSession');
var deleteSession = require('./dlg/DeleteSession');

var getSessionExercises = require('./dlg/ex/GetExercises');
var postSessionExercise = require('./dlg/ex/PostExercise');
var getSessionExercise = require('./dlg/ex/GetExercise');
var putSessionExercise = require('./dlg/ex/PutExercise');
var deleteSessionExercise = require('./dlg/ex/DeleteExercise');
var deleteSessionExercises = require('./dlg/ex/DeleteSessionExercises');

// Register the topics
totoEventPublisher.registerTopic({topicName: 'trainingSessionsCreated', microservice: 'training-session'}).then(() => {}, (err) => {console.log(err);});
totoEventPublisher.registerTopic({topicName: 'trainingSessionsDeleted', microservice: 'training-session'}).then(() => {}, (err) => {console.log(err);});

var api = new Controller('training-session', totoEventPublisher);

// APIs
api.path('GET', '/sessions', getSessions);
api.path('POST', '/sessions', postSession);

api.path('GET', '/sessions/:id', getSession);
api.path('DELETE', '/sessions/:id', deleteSession);

api.path('GET', '/sessions/:id/exercises', getSessionExercises);
api.path('POST', '/sessions/:id/exercises', postSessionExercise);
api.path('DELETE', '/sessions/:id/exercises', deleteSessionExercises);

api.path('GET', '/sessions/:id/exercises/:eid', getSessionExercise);
api.path('PUT', '/sessions/:id/exercises/:eid', putSessionExercise);
api.path('DELETE', '/sessions/:id/exercises/:eid', deleteSessionExercise);

api.listen();
