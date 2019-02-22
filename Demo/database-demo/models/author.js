var mongoose = require('mongoose');
mongoose.connect('mongodb://dev:dev1234@ds347665.mlab.com:47665/posts');

var authorSchema = new mongoose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
});

module.exports = mongoose.model('Author', authorSchema);