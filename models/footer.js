
var keystone = require('keystone');
//create list
var footer = new keystone.List('footer',{
   nocreate: true,
   nodelete: true
});
//add schema
footer.add({
   name: { type: String, required: true, initial: true },
   mainLink: { type: String, required: true, initial: true },
   fbLink: { type: String, required: true, initial: true },
   githubLink: { type: String, required: true, initial: true },
   youtubeLink: { type: String, required: true, initial: true },
   emailAddress:{ type: String, required: true, initial: true }
});

footer.schema.virtual('canAccessKeystone').get(function () {
   return true;
});
//register
footer.register();
//Export model because front end still uses vanilla mongoose
module.exports = footer.model;


/* 
//Mongoose model for when I want to stop using keystone

     const mongoose = require('mongoose');
     const Schema = mongoose.Schema;
     
     const footerSchema = new Schema({
        name: String,
        mainLink: String,
        fbLink: String,
        githubLink: String,
        youtubeLink: String,
        emailAddress: String
     });
     
     const footerModel = mongoose.model('footer', footerSchema);
     
     module.exports = footerModel; */