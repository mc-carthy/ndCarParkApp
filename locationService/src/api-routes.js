let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API functional',
        message: 'LocationService API'
    });
});

let locationController = require('./locationController');

router.route('/locations')
    .get(locationController.index)
    .post(locationController.new);
router.route('/locations/:location_id')
    .get(locationController.view)
    .patch(locationController.update)
    .put(locationController.update)
    .delete(locationController.delete);
router.route('/locations/:location_id/bookings')
    .get(locationController.getCurrentBookings)

module.exports = router;