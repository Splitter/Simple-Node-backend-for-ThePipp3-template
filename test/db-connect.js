const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
before(function(done){
    mongoose.connect('mongodb://localhost/tester',{useNewUrlParser:true});
    mongoose.connection.once('open', function(){
        console.log("Connected to database...");
        done();
    }).on("error",function(error){
        console.log("Connection error: ",error);
    })

});