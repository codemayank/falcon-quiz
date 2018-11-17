const validator = require('validator');
const User = require('./user.model');
const Contact = require('./contacts.model');

async function user(ctx) {
  if (!validator.isMongoId(ctx.params.id))
    ctx.throw(400, 'please provide a valid user id');
  return User.findById(ctx.params.id)
    .then(function(user) {
      ctx.body = user;
    })
    .catch(err => {
      ctx.throw(500, 'error getting user data');
    });
}

async function addUser(ctx) {
  //validate request body
  let requestBody = ctx.request.body;
  if (!validator.isEmail(requestBody.email))
    ctx.throw(400, 'please provide valid email id');
  if (!validator.isMobilePhone(requestBody.mobileNo, 'en-IN'))
    ctx.throw(400, 'please provide a valid indian phone number');
  if (validator.isAfter(requestBody.dob))
    ctx.throw(400, 'Date of birth cannot be after current date');

  let newUser = new User(ctx.request.body);

  return newUser
    .save()
    .then(newUser => {
      ctx.body = newUser;
    })
    .catch(err => {
      console.log(err);
      if (err.code === 11000 && validator.contains(err.errmsg, 'email'))
        ctx.throw(400, 'user with that email address already exists');
      if (err.code === 11000 && validator.contains(err.errmsg, 'mobile'))
        ctx.throw(400, 'user with that phone number already exists');
      ctx.throw(err);
    });
}

async function deleteUser(ctx) {
  return User.findOneAndDelete({ _id: ctx.params.id })
    .then(function(user) {
      ctx.body = 'user deleted successfully';
    })
    .catch(err => {
      ctx.throw(500, 'there was an error in deleting the user');
    });
}

async function addContact(ctx) {
  let requestBody = ctx.request.body;
  //validate request body to ensure only valid phone numbers are provided
  if (!validator.isMobilePhone(requestBody.phone, 'en-IN'))
    ctx.throw(400, 'please provide a valid email id for the contact.');
  if (!validator.isMongoId(requestBody.userId))
    ctx.throw(400, 'provided user id is invalid');
  let newContact = new Contact({
    phone: requestBody.phone,
    name: requestBody.name
  });
  return newContact
    .save()
    .then(newContact => {
      return User.findByIdAndUpdate(
        requestBody.userId,
        {
          $push: { contacts: newContact._id }
        },
        { new: true }
      );
    })
    .then(user => {
      return (ctx.body = user);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  addUser: addUser,
  getUser: user,
  deleteUser: deleteUser,
  addContact: addContact
};
