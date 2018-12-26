
var keystone = require('keystone');
//create list        
var intro = new keystone.List('intro',{
   nocreate: true,
   nodelete: true
});
//add schema
intro.add({
   headerPartOne: { type: String, required: true, initial: true },
   headerPartTwo: { type: String, required: true, initial: true },
   headerPartThree: { type: String, required: true, initial: true },
   labelText: { type: String, required: true, initial: true },
   labelNumber: { type: String, required: true, initial: true },
   bodyText: { type: keystone.Field.Types.Textarea , required: true, initial: true },
   linkOne: { type: String, required: true, initial: true },
   linkOneText: { type: String, required: true, initial: true },
   linkTwo: { type: String, required: true, initial: true },
   linkTwoText: { type: String, required: true, initial: true }
});

intro.schema.virtual('canAccessKeystone').get(function () {
   return true;
});
//register
intro.register();
//Export model because front end still uses vanilla mongoose
module.exports = intro.model;

/* 
//Mongoose model for when I want to stop using keystone
     const mongoose = require('mongoose');
     const Schema = mongoose.Schema;
     
     
     
     const introSchema = new Schema({
        headerPartOne: String,
        headerPartTwo: String,
        headerPartThree: String,
        labelText: String,
        labelNumber: String,
        bodyText: String,
        linkOne: String,
        linkOneText: String,
        linkTwo: String,
        linkTwoText: String
     });
     
     const introModel = mongoose.model('intro', introSchema);
     
     module.exports = introModel; */