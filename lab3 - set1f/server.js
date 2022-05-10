const express = require('express');
const app = express();
const https = require('https');
const bodyparser = require("body-parser");
app.set('view engine', 'ejs');


app.listen(5000, function (err) {
    if (err) console.log(err);
})


const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/timelineDB",
    { useNewUrlParser: true, useUnifiedTopology: true });
const eventSchema = new mongoose.Schema({
    text: String,
    hits: Number,
    time: String
});
const eventModel = mongoose.model("timelineevents", eventSchema);


app.use(express.static('./public'));

app.use(bodyparser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));




// CRUD
// R
app.get('/timeline/getAllEvents', function (req, res) {
    // console.log("received a request for "+ req.params.city_name);
    eventModel.find({}, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})

//C
app.put('/timeline/insert', function (req, res) {
    console.log(req.body)
    eventModel.create({
        text: req.body.text,
        time: req.body.time,
        hits: req.body.hits
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send(data);
    });
})

//U
app.get('/timeline/inreaseHits/:id', function (req, res) {
    console.log(req.params)
    eventModel.updateOne({
       _id : req.params.id
    }, {
        $inc : { hits: 1}
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Update is good!");
    });
})


//D
app.get('/timeline/remove/:id', function (req, res) {
    // console.log(req.params)
    eventModel.remove({
       _id : req.params.id
    }, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Data " + data);
        }
        res.send("Delete is good!");
    });
})


app.get('/profile/:id', function (req, res) {

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    https.get(url, function (https_res) {
        data = '';
        https_res.on("data", function (chunk) {
            data += chunk
        })

        https_res.on('end', function () {
            data = JSON.parse(data)
            // console.log(JSON.parse(data));
            // console.log("data" + JSON.parse(data));


            res.render('profile.ejs', {
                id: data.id,
                name: data.name,
                hp: data.stats.filter((obj) => {
                    return obj.stat.name == "hp"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                attack: data.stats.filter((obj) => {
                    return obj.stat.name == "attack"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                'defense': data.stats.filter((obj) => {
                    return obj.stat.name == "defense"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                "special-attack": data.stats.filter((obj) => {
                    return obj.stat.name == "special-attack"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                "special-defense": data.stats.filter((obj) => {
                    return obj.stat.name == "special-defense"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                "speed": data.stats.filter((obj) => {
                    return obj.stat.name == "speed"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                "electric": data.stats.filter((obj) => {
                    return obj.stat.name == "electric"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                'weight': data.weight,
                'height': data.height
            });
        });
    });
    // res.send('GET request  to homepage')
})