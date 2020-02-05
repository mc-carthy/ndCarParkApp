Booking = require('./bookingModel');

exports.index = function (req, res) {
    Booking.get(function (err, bookings) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Bookings retrieved successfully",
            data: bookings
        });
    });
};

exports.new = function (req, res) {
    var booking = new Booking();
    booking.user_id = req.body.user_id;
    booking.car_id = req.body.car_id;
    booking.save(function (err) {
        if (err) {
            res.json(err);
        };
        res.json({
            message: 'New booking created!',
            data: booking
        });
    });
};

exports.view = function (req, res) {
    Booking.findById(req.params.booking_id, function (err, booking) {
        if (err) {
            res.send(err);
        };
        res.json({
            message: 'Getting booking details...',
            data: booking
        });
    });
};

exports.update = function (req, res) {
    Booking.findById(req.params.booking_id, function (err, booking) {
        if (err) {
            res.send(err);
        }
        booking.user_id = req.body.user_id ? req.body.user_id : booking.user_id;
        booking.car_id = req.body.car_id ? req.body.car_id : booking.car_id;


        booking.save(function (err) {
            if (err) {
                res.json(err);
            };
            res.json({
                message: 'Booking Info updated',
                data: booking
            });
        });
    });
};

exports.delete = function (req, res) {
    Booking.deleteOne({
        _id: req.params.booking_id
    }, function (err, booking) {
        if (err) {
            res.send(err);
        }
        res.json({
            status: "success",
            message: 'Booking deleted'
        });
    });
};