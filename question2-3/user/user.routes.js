const router = require('koa-router')();
const users = require('./user.controller');

router
  .get('/:id', users.getUser)
  .post('/create-user', users.addUser)
  .delete('/delete-user/:id', users.deleteUser)
  .post('/add-contact', users.addContact);

module.exports = router;
