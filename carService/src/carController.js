Car = require('./carModel');

exports.index = function (req, res) {
    Car.get(function (err, cars) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Cars retrieved successfully",
            data: cars
        });
    });
};

exports.new = function (req, res) {
    var car = new Car();
    car.owner_id = req.body.owner_id;
    car.manufacturer = req.body.manufacturer;
    car.model = req.body.model;
    car.registration = req.body.registration;
    car.save(function (err) {
        if (err) {
            res.json(err);
        };
        res.json({
            message: 'New car created!',
            data: car
        });
    });
};

exports.view = function (req, res) {
    Car.findById(req.params.car_id, function (err, car) {
        if (err) {
            res.send(err);
        };
        res.json({
            message: 'Getting car details...',
            data: car
        });
    });
};

exports.update = function (req, res) {
    Car.findById(req.params.car_id, function (err, car) {
        if (err) {
            res.send(err);
        }
        car.owner_id = req.body.owner_id ? req.body.owner_id : car.owner_id;
        car.manufacturer = req.body.manufacturer ? req.body.manufacturer : car.manufacturer;
        car.model = req.body.model ? req.body.model : car.model;
        car.registration = req.body.registration ? req.body.registration : car.registration;

        car.save(function (err) {
            if (err) {
                res.json(err);
            };
            res.json({
                message: 'Car Info updated',
                data: car
            });
        });
    });
};

exports.delete = function (req, res) {
    Car.deleteOne({
        _id: req.params.car_id
    }, function (err, car) {
        if (err) {
            res.send(err);
        }
        res.json({
            status: "success",
            message: 'Car deleted'
        });
    });
};