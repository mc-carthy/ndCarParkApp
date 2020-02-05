let express = require('express')
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let apiRoutes = require("./api-routes")

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/bookingService', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;

if (!db) {
    console.log('Error connecting to DB');
} else {
    console.log('Connected to DB successfully');
}

let port = process.env.PORT || 3005;

app.get('/', (req, res) => res.send('Booking Service route'));
app.use('/api', apiRoutes)

app.listen(port, function () {
     console.log("Running BookingService on port " + port);
});