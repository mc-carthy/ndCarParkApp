let mongoose = require('mongoose');

let contactSchema = mongoose.Schema({
    owner_id: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true
    }
});

var Car = module.exports = mongoose.model('Car', contactSchema);

module.exports.get = function (callback, limit) {
    Car.find(callback).limit(limit);
}