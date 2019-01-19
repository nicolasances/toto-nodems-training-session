var express = require('express');
var logger = require('toto-apimon-events');
var Controller = require('toto-api-controller');

var postSession = require('./dlg/PostSession');
var getSessions = require('./dlg/GetSessions');
var getSession = require('./dlg/GetSession');
var deleteSession = require('./dlg/DeleteSession');

var getSessionExercises = require('./dlg/ex/GetExercises');
var postSessionExercise = require('./dlg/ex/PostExercise');
var getSessionExercise = require('./dlg/ex/GetExercise');
var putSessionExercise = require('./dlg/ex/PutExercise');
var deleteSessionExercise = require('./dlg/ex/DeleteExercise');

var app = express();

var api = new Controller('training-session', app);

// APIs
api.path('GET', '/sessions', getSessions);
api.path('POST', '/sessions', postSession);

api.path('GET', '/sessions/:id', getSession);
api.path('DELETE', '/sessions/:id', deleteSession);

api.path('GET', '/sessions/:id/exercises', getSessionExercises);
api.path('POST', '/sessions/:id/exercises', postSessionExercise);

api.path('GET', '/sessions/:id/exercises/:eid', getSessionExercise);
api.path('PUT', '/sessions/:id/exercises/:eid', putSessionExercise);
api.path('DELETE', '/sessions/:id/exercises/:eid', deleteSessionExercise);

/***********
 * START
 **********/
app.listen(8080, function() {
  console.log('Training Session Microservice up and running');
});
