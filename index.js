var express = require('express');
var Promise = require('promise');
var bodyParser = require("body-parser");
var logger = require('toto-apimon-events');

var postSession = require('./dlg/PostSession');

var apiName = 'training-session';

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  next();
});
app.use(bodyParser.json());

/***************
 * APIS
 ***************/
app.get('/', function(req, res) {res.send({api: apiName, status: 'running'});});

app.post('/sessions', function(req, res) {logger.apiCalled(apiName, '/sessions', 'POST', req.query, req.params, req.body); postSession.do(req.body).then(function(result) {res.send(result);});});
app.get('/sessions', function(req, res) {logger.apiCalled(apiName, '/sessions', 'GET', req.query, req.params, req.body); getSessions.do(req.query).then(function(result) {res.send(result);});});

// app.get('/sessions/:id', function(req, res) {logger.apiCalled(apiName, '/sessions/{id}', 'GET', req.query, req.params, req.body); getSession.do(req.params.id).then(function(result) {res.send(result);});});
// app.delete('/sessions/:id', function(req, res) {logger.apiCalled(apiName, '/sessions/{id}', 'DELETE', req.query, req.params, req.body); deleteSession.do(req.params.id).then(function(result) {res.send(result);});});

// app.get('/sessions/:id/exercises', function(req, res) {logger.apiCalled(apiName, '/sessions/{id}/exercises', 'GET', req.query, req.params, req.body); getSessionExercises.do(req.params.id, req.query).then(function(result) {res.send(result);});});
// app.post('/sessions/:id/exercises', function(req, res) {logger.apiCalled(apiName, '/sessions/{id}/exercises', 'POST', req.query, req.params, req.body); getSessionExercises.do(req.params.id, req.body).then(function(result) {res.send(result);});});

// app.get('/sessions/:id/exercises/:eid', function(req, res) {logger.apiCalled(apiName, '/sessions/{id}/exercises/{eid}', 'GET', req.query, req.params, req.body); getSessionExercise.do(req.params.eid).then(function(result) {res.send(result);});});
// app.put('/sessions/:id/exercises/:eid', function(req, res) {logger.apiCalled(apiName, '/sessions/{id}/exercises/{eid}', 'PUT', req.query, req.params, req.body); putSessionExercise.do(req.params.eid, req.body).then(function(result) {res.send(result);});});

/***********
 * START
 **********/
app.listen(8080, function() {
  console.log('Training Session Microservice up and running');
});
