Location = require('./locationModel');

exports.index = function (req, res) {
    Location.get(function (err, locations) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Locations retrieved successfully",
            data: locations
        });
    });
};

exports.new = function (req, res) {
    var location = new Location();
    location.name = req.body.name;
    location.totalSpaces = req.body.totalSpaces;
    location.freeSpaces = req.body.freeSpaces;
    location.hourlyFee = req.body.hourlyFee;
    location.save(function (err) {
        if (err) {
            res.json(err);
        };
        res.json({
            message: 'New location created!',
            data: location
        });
    });
};

exports.view = function (req, res) {
    Location.findById(req.params.location_id, function (err, location) {
        if (err) {
            res.send(err);
        };
        res.json({
            message: 'Getting location details...',
            data: location
        });
    });
};

exports.update = function (req, res) {
    Location.findById(req.params.location_id, function (err, location) {
        if (err) {
            res.send(err);
        }
        location.name = req.body.name ? req.body.name : location.name;
        location.totalSpaces = req.body.totalSpaces ? req.body.totalSpaces : location.totalSpaces;
        location.freeSpaces = req.body.freeSpaces ? req.body.freeSpaces : location.freeSpaces;
        location.hourlyFee = req.body.hourlyFee ? req.body.hourlyFee : location.hourlyFee;

        location.save(function (err) {
            if (err) {
                res.json(err);
            };
            res.json({
                message: 'Location Info updated',
                data: location
            });
        });
    });
};

exports.delete = function (req, res) {
    Location.deleteOne({
        _id: req.params.location_id
    }, function (err, location) {
        if (err) {
            res.send(err);
        }
        res.json({
            status: "success",
            message: 'Location deleted'
        });
    });
};