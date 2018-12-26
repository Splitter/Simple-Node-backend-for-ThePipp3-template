
var keystone = require('keystone');
//create list     
var page = new keystone.List('page',{
   nocreate: true,
   nodelete: true
});
//add schema
page.add({
   title: { type: String, required: true, initial: true }
});

page.schema.virtual('canAccessKeystone').get(function () {
   return true;
});
//register
page.register();
//Export model because front end still uses vanilla mongoose
module.exports = page.model;


/* 
//Mongoose model for when I want to stop using keystone

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const pageSchema = new Schema({
    title : String
});

const pageModel = mongoose.model('page', pageSchema);

module.exports = pageModel; */