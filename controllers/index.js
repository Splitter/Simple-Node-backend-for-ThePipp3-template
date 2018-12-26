
const express = require('express');
const keystone = require('keystone');

const config = require("../config");

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

//Get data from DB
let page,navigation,intro,about,contact,footer,portfolio,portfolioItems;



// Display Page
router.get(['/','/index.html','/index'], (req, res, next) => {
      
    var view = new keystone.View(req, res);
    //get db data
    pageModel.findOne().exec( (err, data) => { page = data; page.url = config.base_url; });
    navigationModel.findOne().exec( (err, data) => { navigation = data });
    introModel.findOne().exec( (err, data) => { intro = data });
    aboutModel.findOne().exec( (err, data) => { about = data });
    contactModel.findOne().exec( (err, data) => { contact = data });
    footerModel.findOne().exec( (err, data) => { footer = data });
    portfolioModel.findOne().exec( (err, data) => { portfolio = data });
    portfolioDetailsModel.find().exec( (err, data) => { portfolioItems = data });
    //render view
    view.render("index", {
        page:  page,
        navbar: navigation,
        intro: intro,
        about: about,
        contact: contact,
        footer: footer,
        portfolio: portfolio,
        portfolioItems: portfolioItems
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
        portfolioItems: portfolioItems
    });   */
});

module.exports = router;

