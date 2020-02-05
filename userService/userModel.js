let mongoose = require('mongoose');

let contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    car: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

var User = module.exports = mongoose.model('User', contactSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}