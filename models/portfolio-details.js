
var keystone = require('keystone');
var Types = keystone.Field.Types;
//create list
var portfolioDetails = new keystone.List('portfolioDetails');
//create storage object for file uploads
var portfolioDetailsStorage = new keystone.Storage({
   adapter: keystone.Storage.Adapters.FS,
   fs: {
     path: keystone.expandPath('./public/uploads/about'), // required; path where the files should be stored
     publicPath: '/public/uploads/about', // path where files will be served
   }
});

//Add schema
portfolioDetails.add({
   title: { type: String, required: true, initial: true },
   img: {
      type: Types.File,
      storage: portfolioDetailsStorage
   },
   imgLarge: {
       type: Types.File,
       storage: portfolioDetailsStorage
   },
   skills: { type: String, required: true, initial: true },
   category: { type: String, required: true, initial: true },
   linkText: { type: String, required: true, initial: true },
   link: { type: String, required: true, initial: true },
   desc: { type: Types.Textarea, required: true, initial: true },
});

portfolioDetails.schema.virtual('canAccessKeystone').get(function () {
   return true;
});
//register
portfolioDetails.register();
//Export model because front end still uses vanilla mongoose
module.exports = portfolioDetails.model;


/*    
//Mongoose model for when I want to stop using keystone

     const mongoose = require('mongoose');
     const Schema = mongoose.Schema;
     

     const portfolioDetailsSchema = new Schema({
        title: String,
        img: String,
        imgLarge: String,
        skills: String,
        category: String,
        linkText: String,
        link: String,
        desc: String
     });
     
     const portfolioDetailsModel = mongoose.model('portfolioDetails', portfolioDetailsSchema);
     
     module.exports = portfolioDetailsModel; */