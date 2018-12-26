
var keystone = require('keystone');
var Types = keystone.Field.Types;
//create list
var navigation = new keystone.List('navigation',{
   nocreate: true,
   nodelete: true
});
//add base schema
navigation.add({
   logoLink : { type: String, required: true, initial: true },
   logoTextOne : { type: String, required: true, initial: true },
   logoTextTwo : { type: String, required: true, initial: true }
});

navigation.schema.virtual('canAccessKeystone').get(function () {
   return true;
});
//Can add nested schemas this way, but Keystone UI does not support editing of nested schema(one of a few reasons to move away from keystone later)
//works because installer script installed legitamate link data for my purposes
navigation.schema.add({
    links : [{
        name: { type: String, required: true, initial: true },
        link: { type: String, required: true, initial: true }
    }]
});
//register
navigation.register();
//Export model because front end still uses vanilla mongoose
module.exports = navigation.model;


/* 
//Mongoose model for when I want to stop using keystone

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linksSchema = new Schema({
    name: String,
    link: String
});

const navigationSchema = new Schema({
    logoLink : String,
    logoTextOne : String,
    logoTextTwo : String,
    links : [linksSchema]
});

const navModel = mongoose.model('navigation', navigationSchema);

module.exports = navModel; */