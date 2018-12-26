const nodemailer = require('nodemailer');
const express = require('express');
const { body } = require('express-validator/check');
const keystone = require('keystone');
const config = require('../config');

const router = express.Router();

//Get all models
const   pageModel = require("../models/page"),
        navigationModel = require("../models/navigation"),
        introModel = require("../models/intro"),
        aboutModel = require("../models/about"),
        portfolioModel = require("../models/portfolio"),
        portfolioDetailsModel = require("../models/portfolio-details"),
        contactModel = require("../models/contact"),
        footerModel = require("../models/footer");

//variables to store db data in
let page, navigation, intro, about, contact, footer, portfolio, portfolioItems;

//if form submitted with Ajax give json response
router.post(['/ajax'],[
    //Validation
    body('email').isEmail().normalizeEmail(), 
    body('name').not().isEmpty().trim().escape(),
    body('subject').not().isEmpty().trim().escape(),
    body('message').not().isEmpty().trim().escape(),
    body('mobile').isMobilePhone("en-US").trim().escape()
], (req, res, next) => {
    respond(req, res);
});

//if form not submitted with Ajax then degrade gracefully by displaying full page
router.post('/',[
    //Validation
    body('email').isEmail().normalizeEmail(), 
    body('name').not().isEmpty().trim().escape(),
    body('subject').not().isEmpty().trim().escape(),
    body('message').not().isEmpty().trim().escape(),
    body('mobile').isMobilePhone("en-US").trim().escape()
],
 (req, res, next) => {   
    getData();
    respond(req, res, "full");
});


//Get data from DB
const getData = () => {
    pageModel.findOne().exec( (err, data) => { page = data; page.url = config.base_url; });
    navigationModel.findOne().exec( (err, data) => { navigation = data });
    introModel.findOne().exec( (err, data) => { intro = data });
    aboutModel.findOne().exec( (err, data) => { about = data });
    contactModel.findOne().exec( (err, data) => { contact = data });
    footerModel.findOne().exec( (err, data) => { footer = data });
    portfolioModel.findOne().exec( (err, data) => { portfolio = data });
    portfolioDetailsModel.find().exec( (err, data) => { portfolioItems = data });
}

//controller function : handles sending emailing, responding with success/failure and rendering appropriate templates
const respond = (req, res, type = "ajax") => {
    //check for validation errors
    let errors = req.validationErrors();

    //If these variables get set then they show in the template
    let success;
    let errorList;//Is an array of error messages
    //if no errors then try to send email
    if(!errors){
        //Setup transporter
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: config.email_address,
                pass: config.email_password
            }
        });
        //Setup mail options
        let mailOptions = {
            from: '"'+req.body.name+'" <'+req.body.email+'>', 
            to: config.email_address, 
            subject: req.body.subject, 
            text: req.body.name+"\n"+req.body.email+"\n"+req.body.mobile+"\n"+req.body.subject+"\n"+req.body.message
        };
        //Try to send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                errorList = ["Error: error sending email please try again later"];
            }
            else{         
                success = "Email successfully sent, I will be in contact shortly";
            }
            //Send json response if requested else full page
                //browser code will respond based on which variable is set if ajax request
            if(type == "ajax"){
                res.json({ 
                    success: success, 
                    errors: errorList
                });
            } // else send full page(template) in response, to degrade gracefully
            else{       
                var view = new keystone.View(req, res);

                view.render("index", {
                    page:  page,
                    navbar: navigation,
                    intro: intro,
                    about: about,
                    contact: contact,
                    footer: footer,
                    portfolio: portfolio,
                    portfolioItems: portfolioItems,
                    errors: errorList,
                    success, success
                }); 
               /*   Keep to switch away from keystone eventually
                    res.render("index", {
                    page:  page,
                    navbar: navigation,
                    intro: intro,
                    about: about,
                    contact: contact,
                    footer: footer,
                    portfolio: portfolio,
                    portfolioItems: portfolioItems,
                    errors: errorList,
                    success, success
                });  */ 
            }
        });
    }
    else{
        //validation errors
        errorList = [];
        for(i=0 ; i < errors.length; i++){
            errorList.push(errors[i].param +" : "+errors[i].msg);
        }
        //Send json response if requested else full page
            //browser code will respond based on which variable is set if ajax request
        if(type == "ajax"){
            res.json({ 
                success: success, 
                errors: errorList
            });
        } // else send full page(template) in response, to degrade gracefully
        else{           
            var view = new keystone.View(req, res);

            view.render("index", {
                page:  page,
                navbar: navigation,
                intro: intro,
                about: about,
                contact: contact,
                footer: footer,
                portfolio: portfolio,
                portfolioItems: portfolioItems,
                errors: errorList,
                success, success
            }); 
            /*  Keep to switch away from keystone eventually
            res.render("index", {
                page:  page,
                navbar: navigation,
                intro: intro,
                about: about,
                contact: contact,
                footer: footer,
                portfolio: portfolio,
                portfolioItems: portfolioItems,
                errors: errorList,
                success, success
            });   */
        }        
    }
}

module.exports = router;
