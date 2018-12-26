const config ={
    //MongoDB uri
    db_uri: 'mongodb://localhost/tester',
    //base url to tie links to in template
    base_url:'http://localhost/',
    //Gmail email to send email to from contact form
    //Todo: Should use a more secure option
    email_address: "blahblah@gmail.com",
    //Email password
    email_password: "password",
    //cookie secret
    cookie_secret: "Your cookie secret"



}




//Export all options
module.exports = config;