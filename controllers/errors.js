const nodemailer = require('nodemailer');
const express = require('express');

const config = require('../config');

const router = express.Router();

//Get all models
const   pageModel = require("../models/page"),
        navigationModel = require("../models/navigation"),
        footerModel = require("../models/footer");

//Get data from DB
let page,navigation,footer,portfolioItems;

pageModel.findOne().exec( (err, data) => { page = data; page.url = config.base_url; });
navigationModel.findOne().exec( (err, data) => { navigation = data });
footerModel.findOne().exec( (err, data) => { footer = data });

//404 page
module.exports.render404Page = function(req,res,next){
    res.status(404).render("error", {
        page:  page,
        navbar: navigation,
        footer: footer,
        error: {
            status : "404: Page not found!",
            message: "Please check that the url is correct and try again."
        }
    });  
};

//General error page
module.exports.renderErrorPage = function(err, req, res, next){
    res.status(500).render("error", {
        page:  page,
        navbar: navigation,
        footer: footer,
        error: {
            status : "500: Error!",
            message: err//"Internal server error, please try again later."
        }
    });  

};
