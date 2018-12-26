
var keystone = require('keystone');
var Types = keystone.Field.Types;
//create list
var portfolio = new keystone.List('portfolio',{
   nocreate: true,
   nodelete: true
});
//adds schema
portfolio.add({
   headerPartOne: { type: String, required: true, initial: true },
   headerPartTwo: { type: String, required: true, initial: true },
   labelText: { type: String, required: true, initial: true },
   labelNumber: { type: String, required: true, initial: true }
});

portfolio.schema.virtual('canAccessKeystone').get(function () {
   return true;
});
//register
portfolio.register();
//Export model because front end still uses vanilla mongoose
module.exports = portfolio.model;


/* 
//Mongoose model for when I want to stop using keystone

     const mongoose = require('mongoose');
     const Schema = mongoose.Schema;
     
     

     const portfolioSchema = new Schema({
        headerPartOne: String,
        headerPartTwo: String,
        labelText: String,
        labelNumber: String
     });
     
     const portfolioModel = mongoose.model('portfolio', portfolioSchema);
     
     module.exports = portfolioModel; */