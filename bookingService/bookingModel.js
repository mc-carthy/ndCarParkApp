let mongoose = require('mongoose');

let contactSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    car_id: {
        type: String,
        required: true
    },
    location_id: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Number,
        default: null
    },
    fee: {
        type: Number,
        default: 0
    }
});

var Booking = module.exports = mongoose.model('Booking', contactSchema);

module.exports.get = function (callback, limit) {
    Booking.find(callback).limit(limit);
}