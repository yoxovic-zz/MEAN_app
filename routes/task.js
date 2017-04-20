var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../models/task');

// Defined routes for API

router.route('/task')

  .get(function (req, res) {
    Task.find({}, function (err, tasks) {
      if (err || !tasks) {
        res.status(500).send(err);
      }
      res.status(200).json(tasks);
    });
  })

  .post(function (req, res) {

    //create task object to save
    var task = { name: req.body.name };

    //create new task model build up from task object
    var nTask = new Task(task);

    // Save task to DB
    nTask.save(function (err, task) {
      if (err || !task) {
        res.status(500).send(err);
      }
      res.status(200).json(task);
    });
  })

// Defined routes for particular task

router.route('/task/:_id')

  .get(function (req, res) {

    var task_id = req.params['_id'];

    Task.findById(task_id, function (err, task) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(task);
    });
  })
  
  .put(function (req, res) {

    var task_id = req.params['_id'];
    var update_task = { name: req.body['name'] };

    // update the task by id
    Task.findByIdAndUpdate(task_id, update_task, function (err, task_updated) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(task_updated);
    });
  })

  .delete(function (req, res) {
    Task.findByIdAndRemove(req.params._id, function (err, task_deleted) {
      if (err) {
        res.send(err);
      }
      res.json(task_deleted);
    });
  });

module.exports = router;