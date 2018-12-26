
var keystone = require('keystone');
var Types = keystone.Field.Types;
//create list
var about = new keystone.List('about',{
   nocreate: true,
   nodelete: true
});
//storage object for file uploads
var aboutStorage = new keystone.Storage({
   adapter: keystone.Storage.Adapters.FS,
   fs: {
     path: keystone.expandPath('./public/uploads/about'), // required; path where the files should be stored
     publicPath: '/public/uploads/about', // path where files will be served
   }
 });
//Add schema
about.add({
   headerPartOne: { type: String, required: true, initial: true },
   headerPartTwo: { type: String, required: true, initial: true },
   labelText: { type: String, required: true, initial: true },
   labelNumber: { type: String, required: true, initial: true },
   textColOne:  { type: Types.Textarea },
   textColTwo:  { type: Types.Textarea },
   imgColOne: {
      type: Types.File,
      storage: aboutStorage
    },
    imgColTwo: {
       type: Types.File,
       storage: aboutStorage
     }
});

about.schema.virtual('canAccessKeystone').get(function () {
   return true;
});

about.register();
//Export model because front end still uses  vanilla mongoose
//less to edit out later when moving away from keystone
module.exports = about.model;


//Mongoose model for when I want to stop using keystone
/* 
     const mongoose = require('mongoose');
     const Schema = mongoose.Schema;
     
     
     
     const aboutSchema = new Schema({
        headerPartOne: String,	
        headerPartTwo: String,
        labelText: String,
        labelNumber: String,
        textColOne: String,
        textColTwo: String,
        imgColOne: String,
        imgColTwo: String
        
     });
     
     const aboutModel = mongoose.model('about', aboutSchema);
     
     module.exports = aboutModel; */