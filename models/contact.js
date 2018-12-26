
var keystone = require('keystone');
var Types = keystone.Field.Types;
//create list
var contact = new keystone.List('contact',{
   nocreate: true,
   nodelete: true
});
//add schema
contact.add({
   headerPartOne: { type: String, required: true, initial: true },
   headerPartTwo: { type: String, required: true, initial: true },
   labelText: { type: String, required: true, initial: true },
   labelNumber: { type: String, required: true, initial: true },
   descText: { type: Types.Textarea }
});

contact.schema.virtual('canAccessKeystone').get(function () {
   return true;
});
//register
contact.register();
//Export model because front end still uses vanilla mongoose
module.exports = contact.model;


//Mongoose model for when I want to stop using keystone
 /*     const mongoose = require('mongoose');
     const Schema = mongoose.Schema;
     
      
     const contactSchema = new Schema({
        headerPartOne: String,
        headerPartTwo: String,
        labelText: String,
        labelNumber: String,
        descText: String,
     });
     
     const contactModel = mongoose.model('contact', contactSchema);
     
     module.exports = contactModel; */