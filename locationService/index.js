let express = require('express')
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let apiRoutes = require("./api-routes")

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const DB_URI = process.env.MONGO_DB_URI ? process.env.MONGO_DB_URI : "mongodb://localhost:27017/locationService";
mongoose.connect(DB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;

if (!db) {
    console.log('Error connecting to DB');
} else {
    console.log('Connected to DB successfully');
}

let port = process.env.PORT || 3003;

app.get('/', (req, res) => res.send('Location Service route'));
app.use('/api', apiRoutes)

app.listen(port, function () {
     console.log("Running LocationService on port " + port);
});