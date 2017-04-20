var mongoose = require('mongoose');
 
var task_schema = new mongoose.Schema({
    name: String,
}, {
    versionKey: false
});
 
module.exports = mongoose.model('task', task_schema);