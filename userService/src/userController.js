User = require('./userModel');

exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.car = req.body.car;
    user.phone = req.body.phone;
    user.save(function (err) {
        if (err) {
            res.json(err);
        };
        res.json({
            message: 'New user created!',
            data: user
        });
    });
};

exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.send(err);
        };
        res.json({
            message: 'Getting user details...',
            data: user
        });
    });
};

exports.update = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.send(err);
        }
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email;
        user.car = req.body.car;
        user.phone = req.body.phone;

        user.save(function (err) {
            if (err) {
                res.json(err);
            };
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};

exports.delete = function (req, res) {
    User.deleteOne({
        _id: req.params.user_id
    }, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};