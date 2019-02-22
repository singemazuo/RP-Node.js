var mongoose = require('mongoose');
mongoose.connect('mongodb://dev:dev1234@ds347665.mlab.com:47665/posts');

var post = new mongoose.Schema({
    title:String,
    description:String,
    ingredient:{type: Schema.Types.ObjectId, ref: 'author'}
});

module.exports = post;