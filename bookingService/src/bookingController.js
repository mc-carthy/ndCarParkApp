const request = require('request-promise');
// const userService = 'http://localhost:3001';
// const carService = 'http://localhost:3002';
// const locationService = 'http://localhost:3003';

const userService = 'http://users:3001';
const carService = 'http://cars:3002';
const locationService = 'http://locations:3003';

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
    booking.location_id = req.body.location_id;
    booking.startDate = req.body.startDate || Date.now();
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

exports.bookingDetails = function(req, res) {
    const summaryRequest = Booking.findById(req.params.booking_id);
    summaryRequest.then((summary) => {
        const userRequest = request({ uri: `${userService}/api/users/${summary.user_id}`, rejectUnauthorized: false, json: true });
        const carRequest = request({ uri: `${carService}/api/cars/${summary.car_id}`, rejectUnauthorized: false, json: true });
        const locationRequest = request({ uri: `${locationService}/api/locations/${summary.location_id}`, rejectUnauthorized: false, json: true });
        const promises = [userRequest, carRequest, locationRequest];
        Promise.all(promises).then((responses) => {
            const userResponse = responses[0].data;
            const carResponse = responses[1].data;
            const locationResponse = responses[2].data;
            res.json({
                user: {
                    name: userResponse.name,
                    email: userResponse.email,
                    email: userResponse.phone,
                },
                car: {
                    manufacturer: carResponse.manufacturer,
                    model: carResponse.model,
                    registration: carResponse.registration,
                },
                location: {
                    name: locationResponse.name
                },
                startDate: summary.startDate,
                endDate: summary.endDate,
                fees: summary.fee
            })
        }).catch((err) => res.send(err));
    });
}