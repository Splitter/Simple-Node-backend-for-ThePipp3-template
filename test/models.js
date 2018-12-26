const assert = require("assert");
const pageModel = require("../models/page.js");
const navModel = require("../models/navigation.js");


describe("Testing models", function(){

    it('pageModel:',function(done){
        console.log("Testing: pageModel");
        const page = new pageModel({title:"test"});
        console.log("Creating...");
        page.save().then(function(){
            assert(page.isNew === false);
            console.log("Reading...");
            pageModel.findById(page._id).then(function(res){
                assert(page.title == res.title);
                console.log("Updating..");                  
                pageModel.findOneAndUpdate({_id: res._id}, {title:"New Title"}).then(function(res){
                    assert(page.title == res.title);
                    console.log("Deleting.");            
                    pageModel.findByIdAndDelete({_id: res._id}, {title:"New Title"}).then(function(res){                        
                        pageModel.findOne({ _id: res._id }, function (err, page) {
                            assert(page == null);
                        });
                        done();
                    })

                });
            });
        });
    });

    it('navModel:', function(done){
        console.log("Testing; navModel");

    })



});