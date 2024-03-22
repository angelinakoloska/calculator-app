const { Router } = require('express');
const { save } = require('../save_json');
let favoriteNumber = require('../number.json');
const add = require('../add');

const router = new Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
}) 

/* GET home page. */
router.get('/sum/:number1/:number2', function(req, res, next) {
  const { number1, number2 } = req.params;
  if (number1 == null || number2 == null) {
    res.status(400).send('Not provided numbers');
    return;
  }

  if (isNaN(parseInt(number1) || isNaN(parseInt(number2)))){
    res.status(400).send('Numbers need to be integer');
    return;
  }

  const result = add(favoriteNumber.favoriteNumber, add(parseInt(number1), parseInt(number2)));
  res.json({
    status: "success",
    result: result
  });
});

router.post('/favNumber', (req, res) => {
  const {number} = req.body;
  if (number == null) {
    res.status(400).send('Not provided numbers');
    return;
  }

  if (isNaN(parseInt(number))) {
    res.status(400).send('The input should be a number');
    return;
  }
  favoriteNumber.favoriteNumber = number;
  save(number)
  res.json({
    status: "success",
    newFavoriteNumber: number
  });
});

router.delete('/favNumber', (req, res) => {
  favoriteNumber.favoriteNumber = 0;
  save(favoriteNumber);
  res.json({
    status: "success"
  });
});

module.exports = router;
