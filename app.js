const express = require('express');

const app = express();

var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(__dirname + '/AngularApp/dist')); 

// Require Mongoose
var mongoose = require('mongoose');
// connect to mongodb using mongoose - "restful_api" is the name of the db for this project
mongoose.connect('mongodb://localhost/restful_api');

// create schema
var Schema = mongoose.Schema;

var TaskSchema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 4},
    description: {type: String, required: true, minlength: 4},
    completed: {type: Boolean}
}, {timestamps: true})
mongoose.model('Task',TaskSchema);
var Task = mongoose.model('Task')


app.get('/', function (req, res){
    console.log('got hit');
    res.render('index');
});

app.get('/restful/', function(req, res) {
    Task.find({}, function(err, tasks) {
        if(err){
            console.log("error retrieving tasks");
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: tasks})
        }
    })
})

app.get('/restful/:id', function (req, res){
    Task.find({_id: req.params.id}, function (err, task) {
        if (err){
            console.log("error retrieving the task");
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: task})
        }
    })
})

// Here is the route to create a task
app.post('/restful/', function(req, res) {
    console.log("title: ", req.body.title,"description: ", req.body.description,"completed: ", req.body.completed);
    var task = new Task({title: req.body.title, description: req.body.description, completed: req.body.completed});
    task.save(function(err){
        if (err){
            console.log("error creating the task");
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: task})
        }
    })
})

app.get('/restful/delete/:id', function(req,res){
    Task.remove({_id: req.params.id}, function (err, task) {
        if (err){
            console.log("error retrieving the task");
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Task removed", data: req.params.id})
        }
    })   
})

// this is the restful update route - using put
app.put('/restful/:id', function(req,res){
    console.log("in update route")
    Task.update({_id: req.params.id}, {title: req.body.title, description: req.body.description, completed: req.body.completed}, function (err){
        if (err){
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success - Task Updated"})
        }
    });    
})


app.listen(8000, function() {
    console.log("Restful Tasks Continued is listening on port 8000")
})