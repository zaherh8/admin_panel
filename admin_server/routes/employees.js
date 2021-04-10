var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function (req, response, next) {
  // console.log(process.env.DB_SEED_URL + 'results=50')
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      // const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      response.status(200)
      // these headers are needed for the data provider for the clien react admin library to properly work.
      response.set({
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': 'Content-Range',
        'Content-Range': 'employees 0-24/319'
      });
      response.send(res.data)
    })
    .catch(err => {
      response.status(400)
      response.send({ "error": err.message })
    });
});

module.exports = router;
