//All this script does is install sample data to database

const config = require("./config");

const fs = require('fs');
const mongoose = require('mongoose');
const assert = require("assert");

const pageModel = require("./models/page.js");
const navigationModel = require("./models/navigation.js");
const introModel = require("./models/intro.js");
const aboutModel = require("./models/about.js");
const portfolioModel = require("./models/portfolio.js");
const portfolioDetailsModel = require("./models/portfolio-details.js");
const contactModel = require("./models/contact.js");
const footerModel = require("./models/footer.js");

//Get sample DB data
const templateData = JSON.parse(fs.readFileSync('sample-data.json'));

//connect to db
console.log("Running install script..");
mongoose.Promise = global.Promise;
mongoose.connect(config.db_uri,{useNewUrlParser:true});
mongoose.connection.once('open', () => {
    console.log("Connected to database...");
}).on("error", error => {
    console.log("Connection error: ",error);
    console.log("Please make sure you edit config.js with proper DB URI");
    process.exit(1);
})

console.log("Inserting sample data in database..");
//Inserting Portfolio items
portfolioDetailsModel.insertMany(templateData.portfolioItems).then( () => {
    console.log("portfolio items collection success.");

    //Inserting Portfolio section data
    const portfolio = new portfolioModel(templateData.portfolio);
    portfolio.save().then( () => {
        assert(portfolio.isNew === false);
        console.log("portfolio data success.");

        //Inserting Navigation section data
        const navigation = new navigationModel(templateData.navbar);
        navigation.save().then( () => {
            assert(navigation.isNew === false);
            console.log("navigation data success.");

            //Inserting Footer section data
            const footer = new footerModel(templateData.footer);
            footer.save().then( () => {
                assert(footer.isNew === false);
                console.log("footer data success.");

                //Inserting Intro section data
                const intro = new introModel(templateData.intro);
                intro.save().then( () => {
                    assert(intro.isNew === false);
                    console.log("intro data success.");

                    //Inserting Page data
                    const page = new pageModel(templateData.page);
                    page.save().then( () => {
                        assert(page.isNew === false);
                        console.log("page data success.");

                        //Inserting About section data
                        const about = new aboutModel(templateData.about);
                        about.save().then( () => {
                            assert(about.isNew === false);
                            console.log("about data success.");

                            //Inserting Contact section data
                            const contact = new contactModel(templateData.contact);
                            contact.save().then( () => {
                                assert(contact.isNew === false);
                                console.log("contact data success.");
                                //Disconnect from DB
                                mongoose.disconnect(); 
                            });                            
                        });
                    });
                });                
            });
        });        
    });
}); 






