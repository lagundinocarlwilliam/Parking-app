const express = require('express');
const port = process.env.PORT || 5000;
const path = require("path");
var Entrance1_Parking_Schema = require('./data/Entrance1_Parking_Schema.json')
var Entrance2_Parking_Schema = require('./data/Entrance2_Parking_Schema.json')
var Entrance3_Parking_Schema = require('./data/Entrance3_Parking_Schema.json')

const app = express();

// API Middleware
app.use(express.json()); // this is to accept data in JSON format
app.use(express.urlencoded()); // this is to decode the data send through html form
app.use(express.static(__dirname + 'public/Static')); //declares the static folder to public
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// -- api routes -- //

// user routes
app.get('/user/homepage', (req, res) => {
    res.sendFile(__dirname + '/public/Static/User/Homepage/Homepage.html');
})

app.get('/user/detailpage', (req, res) => {
    res.sendFile(__dirname + '/public/Static/User/Detailpage/User-Detailpage.html');
})

app.post('/user/addDetails', (req, res) => {
    try {
        localStorage.setItem("qrObj", JSON.stringify(req.body));
        res.end("OK");
    } catch {
        res.end("ERROR /user/addDetails");
    }
})

app.get('/user/qrpage', (req, res) => {
    res.sendFile(__dirname + '/public/Static/User/QRPage/User-QRPage.html');
    // var qrObj = JSON.parse(localStorage.getItem("qrObj"));
})

app.get('/user/getqrdetails', (req, res) => {
    var qrObj = JSON.parse(localStorage.getItem("qrObj"));
    res.status(200).json(qrObj);
    res.end();
})

// admin routes
app.get('/admin/homepage', (req, res) => {
    res.sendFile(__dirname + '/public/Static/Admin/Homepage.html');
})

app.get('/admin/getparking', (req, res) => {
    var wholeParkingObject = {
        "parking1" : Entrance1_Parking_Schema,
        "parking2" : Entrance2_Parking_Schema,
        "parking3" : Entrance3_Parking_Schema
    };

    res.status(200).json(wholeParkingObject);
    res.end();
})

app.get('/admin/html5-qrcode.min.js', function(req, res) {
    res.sendFile(__dirname + '/public/Static/Admin/html5-qrcode.min.js');
});

// listen to port
app.listen(port, () => {
    console.log(`Server started at http://localhost:${[port]}`)
})