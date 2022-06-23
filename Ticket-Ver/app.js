const express = require('express');
const port = process.env.PORT || 5000;
const path = require("path");
// var Entrance1_Parking_Schema = require('./data/Entrance1_Parking_Schema.json')
// var Entrance2_Parking_Schema = require('./data/Entrance2_Parking_Schema.json')
// var Entrance3_Parking_Schema = require('./data/Entrance3_Parking_Schema.json')
var filename = './data/Parking_Schema.json';
var file = require(filename)

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
    res.sendFile(__dirname + '/public/Static/User/Detailpage/User-Detailpage-IN.html');
})


app.post('/user/addDetails', (req, res) => {
    try {
        localStorage.setItem("sessionTicket", req.body["ticketNumber"]);
        localStorage.setItem(req.body["ticketNumber"], JSON.stringify(req.body));
        res.end("OK");
    } catch {
        res.end("ERROR /user/addDetails");
    }
})

app.get('/user/ticketpage', (req, res) => {
    res.sendFile(__dirname + '/public/Static/User/QRPage/User-TicketPage.html');
})

app.get('/user/getqrdetails', (req, res) => {
    var ticketNumber = localStorage.getItem("sessionTicket");
    var ticketObj = JSON.parse(localStorage.getItem(ticketNumber));
    res.status(200).json(ticketObj);
    res.end();
})

// admin routes
app.get('/admin/homepage', (req, res) => {
    res.sendFile(__dirname + '/public/Static/Admin/Homepage.html');
})

app.get('/admin/getparking', (req, res) => {
    var wholeParkingObject = {
        "parking" : file
    };

    res.status(200).json(wholeParkingObject);
    res.end();
})

app.post('/admin/getSessionTicket', (req, res) => {
    try {
        var data = JSON.parse(localStorage.getItem(req.body["ticketNumber"]));
        res.status(200).json(data);
        res.end();
    } catch {
        res.end("ERROR /user/getSessionTicket");
    }
})

app.post('/admin/updateParkingSchema', (req, res) => {
    try {
        // console.log(req.body)
        console.log(file[parkingID].slots);
        // file.key = "new value";
    
        // fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        //   if (err) return console.log(err);
        //   console.log(JSON.stringify(file));
        //   console.log('writing to ' + fileName);
        // });
        res.status(200);
        res.end("OK");
    } catch {
        res.end("ERROR /user/updateParkingSchema");
    }
})

// listen to port
app.listen(port, () => {
    console.log(`Server started at http://localhost:${[port]}`)
})