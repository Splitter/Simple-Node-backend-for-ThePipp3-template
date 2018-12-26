var keystone = require('keystone');
var Types = keystone.Field.Types;
//create list
var User = new keystone.List('User');
//add schema
User.add({
  displayName: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  password: { type: Types.Password, initial: true },
  canAccessKeystone: { type: Boolean, initial: true }
});
//register
User.register();