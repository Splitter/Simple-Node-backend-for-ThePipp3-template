const mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    keystone = require('keystone'),
    serve = require('serve-static'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    multer = require('multer');

const config = require("./config");

//Frontend controllers/routers
const index= require('./controllers/index');
const contact = require('./controllers/contact');
const portfolio = require('./controllers/portfolio-item');
const errorHandler = require('./controllers/errors');

//initialize express and setup
const app = express();
app.locals.pretty = true;//Output well formatted html
//thirdparty middleware for form
app.use(cookieParser(config.cookie_secret));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());

//Keystone
keystone.init({
    'name': 'ThePipp',
    'brand': '',
    'session': false,
    'updates': 'updates',
    'auth': true,
    'user model': 'User',
    'auto update': true,
    'cookie secret': config.cookie_secret,    
    'port': 80,
    'mongo': config.db_uri
  });
  
keystone.import('models');
//set view engine to pug
app.set('view engine','pug');
//set directory for static assets
app.use("/Assets",express.static("public"));
app.use(serve('./public'));

//connect to db
mongoose.Promise = global.Promise;
mongoose.connect(config.db_uri,{useNewUrlParser:true});
mongoose.connection.once('open', () => {
    console.log("Connected to database...");
}).on("error", error => {
    console.log("Connection error: ",error);
    console.log("Please make sure you edit install script with proper DB URI");
    process.exit(1);
})

//Route frontend traffic
    //controller modules also handle routing in this simple app
app.use('/', index);
app.use('/contact', contact);
app.use('/portfolio', portfolio);

//route the rest of the requests to a 404 page
app.use(errorHandler.render404Page);

//route the errors to an Error page
app.use(errorHandler.renderErrorPage);
   
keystone.set('routes', app);
app.use('/keystone', keystone.Admin.Server.createDynamicRouter(keystone));
keystone.start();
console.log("Server is running");