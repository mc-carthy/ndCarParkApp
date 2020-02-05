let mongoose = require('mongoose');

let contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    totalSpaces: {
        type: Number,
        required: true
    },
    freeSpaces: {
        type: Number,
        required: true
    },
    hourlyFee: {
        type: Number,
        required: true
    },
    currentBookings: {
        type: [String],
        default: []
    }
});

var Location = module.exports = mongoose.model('Location', contactSchema);

module.exports.get = function (callback, limit) {
    Location.find(callback).limit(limit);
}