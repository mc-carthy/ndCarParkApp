let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API functional',
        message: 'CarService API'
    });
});

let carController = require('./carController');

router.route('/cars')
    .get(carController.index)
    .post(carController.new);
router.route('/cars/:car_id')
    .get(carController.view)
    .patch(carController.update)
    .put(carController.update)
    .delete(carController.delete);

module.exports = router;