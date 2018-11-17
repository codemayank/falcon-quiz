require('dotenv').config();
const logger = require('koa-logger');
// const router = require('koa-router')();
const userRouter = require('./user/user.routes');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const koa = require('koa');

const app = new koa();

app.use(logger());
app.use(koaBody());

//database connection
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

app.use(userRouter.routes());

app.listen(3000);
