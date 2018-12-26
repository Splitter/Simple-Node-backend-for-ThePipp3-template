
const express = require('express');
const keystone = require('keystone');

const config = require("../config");
const router = express.Router();

//Get all models
const   pageModel = require("../models/page"),
        navigationModel = require("../models/navigation"),
        footerModel = require("../models/footer"),
        portfolioDetailsModel = require("../models/portfolio-details");

//Get data from DB
let page,navigation,footer;

pageModel.findOne().exec( (err, data) => { page = data; page.url = config.base_url; });
navigationModel.findOne().exec( (err, data) => { navigation = data });
footerModel.findOne().exec( (err, data) => { footer = data });

// Display page for each portfolio item(to degrade gracefully if browsers JS disabled)
router.get('/:id', (req, res, next) => {
    portfolioDetailsModel.findById( req.params.id ).exec( (err, data) => {
            if(err){ console.log(err); next(); }       
            var view = new keystone.View(req, res);
            //render view
            view.render("portfolio-item", {
                page:  page,
                navbar: navigation,
                footer: footer,
                portfolioItems: data
            }); 
             
            /*Keep to switch away from keystone eventually
                 res.render("portfolio-item", {
                page:  page,
                navbar: navigation,
                footer: footer,
                portfolioItems: data
            });   */
        });
});

module.exports = router;
