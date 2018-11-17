const mongoose = require('mongoose');
const Contact = require('./contacts.model');

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  dob: {
    type: Date
  },
  password: String,
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact'
    }
  ]
});

//post hook to remove user contacts from contacts collection
UserSchema.post('findOneAndDelete', function(doc) {
  Contact.deleteMany({ _id: { $in: doc.contacts } }).then(contacts => {
    console.log('contacts deleted successfully');
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
