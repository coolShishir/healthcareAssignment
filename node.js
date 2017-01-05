// This file does entire backEnd handling of the code . 
"use strict";

// declarig and importing node and  express modules for various tasks 
var nodemailer = require('nodemailer');  // module for sending mail
var express = require('express');  // module for express library
var app = express(); 
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID; // module for mongodb
var mongo = require("mongodb"),
    fs = require("fs"),         // to read static files
    http = require("http");
var bodyParser = require("body-parser");  // module for text parsing

app.use(bodyParser());

var mongodbUri = "mongodb://127.0.0.1/chat"; // establing monoDb connection

// for handling web page access restrictions done by browser for security     
app.use(function(req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (req.method === 'OPTIONS') return res.send(200)
    }
    next()
})

// creating server
var server = app.listen(3000, function () {
  var host = server.address().address
  console.log(host)
  var port = server.address().port
  console.log("app listening at http://@%s:%s", host, port);
});

//routing 
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/signUp', function(req, res){
    res.sendFile(__dirname + '/signUp.html');
});

app.get('/doctor', function(req, res){
    res.sendFile(__dirname + '/doctor.html');
});

app.get('/patient', function(req, res){
    res.sendFile(__dirname + '/patient.html');
});

app.get('/users', function(req, res){
    res.sendFile(__dirname + '/users.html');
});

app.get('/doctors', function(req, res){
    res.sendFile(__dirname + '/doctors.html');
});

app.get('/patients', function(req, res){
    res.sendFile(__dirname + '/patients.html');
});

//inserts doctor details in doctor db
app.post('/addDoctor', function (req, res) {	
  mongo.MongoClient.connect(mongodbUri, function(err, db) {
  assert.equal(null, err);
  db.collection('doctors').insertOne( req.body ,
    function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the doctors collection.");
  	});
  });
});

//inserts patient detials in patient db
app.post('/addPatient', function (req, res) {  
  mongo.MongoClient.connect(mongodbUri, function(err, db) {
  assert.equal(null, err);
  db.collection('patients').insertOne( req.body ,
    function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the patients collection.");
    });
  });
});

app.post('/addVisit', function (req, res) {  
  mongo.MongoClient.connect(mongodbUri, function(err, db) {
  assert.equal(null, err);
  db.collection('visits').insertOne( req.body ,
    function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the visits collection.");
    });
  });
});

// query db for login credentials
app.put('/loginDoctor', function(req, res) {
  mongo.MongoClient.connect(mongodbUri, function(err, db) {
  assert.equal(null, err);
  var x = 0 
  db.collection('doctors').find({emailId:req.body.emailId,password:req.body.password}).toArray(function(err, docs) {
      console.log( docs.length ); 
      x = docs.length 
      console.log(docs)
      if ( x == 0 ) res.end("0")
      else res.end(JSON.stringify(docs))
      });

  });
})

app.get('/findAllDoctors', function(req, res) {
  mongo.MongoClient.connect(mongodbUri, function(err, db) {
  assert.equal(null, err);
  var x = 0 
  db.collection('doctors').find({}).toArray(function(err, docs) {
      console.log( docs.length ); 
      res.end(JSON.stringify(docs))
      });
  });
})

app.put('/findAllVisits', function(req, res) {
  mongo.MongoClient.connect(mongodbUri, function(err, db) {
  assert.equal(null, err);
  console.log(req.body.patientName)
  db.collection('visits').find({patientName:req.body.patientName}).toArray(function(err, docs) {
      console.log( docs.length ); 
      res.end(JSON.stringify(docs))
      });
  });
})

app.put('/findAllVisitsDoctor', function(req, res) {
  mongo.MongoClient.connect(mongodbUri, function(err, db) {
  assert.equal(null, err);
  console.log(req.body.doctorName)
  db.collection('visits').find({doctorName:req.body.doctorName}).toArray(function(err, docs) {
      console.log( docs.length ); 
      res.end(JSON.stringify(docs))
      });
  });
})

app.put('/findRatingOfDoctor', function(req, res) {
  mongo.MongoClient.connect(mongodbUri, function(err, db) {
  assert.equal(null, err);
  console.log(req.body.doctorName)
  db.collection('visits').find({doctorName:req.body.doctorName}).toArray(function(err, docs) {
      console.log( docs.length ); 
      res.end(JSON.stringify(docs))
      });
  });
})

app.put('/loginPatient', function(req, res) {
  mongo.MongoClient.connect(mongodbUri, function(err, db) {
  assert.equal(null, err);
  console.log(req.body.emailId)
  console.log(req.body.password)
  var x = 0 
  db.collection('patients').find({emailId:req.body.emailId,password:req.body.password}).toArray(function(err, docs) {
      console.log( docs.length ); 
      x = docs.length 
      console.log(docs)
      if ( x == 0 ) res.end("0")
      else res.end(JSON.stringify(docs))
      });

  });
})