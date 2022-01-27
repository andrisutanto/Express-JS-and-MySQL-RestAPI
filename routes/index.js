var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get nya bisa diganti dengan put patch delete dll
router.get('/json', (req, res) => {
  res.json({
    message: 'nama saya andri sutanto'
  });
});

module.exports = router;
