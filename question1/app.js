const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const koa = require('koa');

const app = new koa();

app.use(logger());
app.use(koaBody());

//get api to query for prime numbers up to numbers param in url
router.get('/:number', getPrimes);

app.use(router.routes());

async function getPrimes(ctx) {
  let primeNumbers = calculatePrimes(ctx.params.number);
  ctx.body = primeNumbers.join(', ');
}

function calculatePrimes(n) {
  let a = [];
  const userNumber = n;
  //find list of prime numbers by seive of eratosthenes algorithm
  for (let i = 1; i <= userNumber; i++) {
    a.push(true);
  }
  for (let i = 2; i <= Math.sqrt(userNumber); i++) {
    if (a[i]) {
      for (let j = Math.pow(i, 2); j <= userNumber; j += i) {
        a[j] = false;
      }
    }
  }
  var primeNumbers = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] && i > 1) {
      primeNumbers.push(i);
    }
  }
  return primeNumbers;
}

app.listen(3000);
