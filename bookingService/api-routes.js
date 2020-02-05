let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API functional',
        message: 'BookingService API'
    });
});

let bookingController = require('./bookingController');

router.route('/bookings')
    .get(bookingController.index)
    .post(bookingController.new);
router.route('/bookings/:booking_id')
    .get(bookingController.view)
    .patch(bookingController.update)
    .put(bookingController.update)
    .delete(bookingController.delete);

module.exports = router;