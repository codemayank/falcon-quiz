const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  }
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
