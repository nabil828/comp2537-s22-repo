const express = require('express')
const app = express()
app.set('view engine', 'ejs');

app.listen(5000, function (err) {
    if (err)
        console.log(err);
})

// app.get('/', function (req, res) {
//     res.send('<h1> GET request to homepage </h1>')    
// })


const https = require('https');


app.get('/profile/:id', function (req, res) {
    // console.log(req);

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = ""
    https.get(url, function (https_res) {
        https_res.on("data", function (chunk) {
           data += chunk
        })

        https_res.on("end", function () {
            data = JSON.parse(data)

            z  = data.stats.filter(function (obj){
                return obj.stat.name == "hp"
            }).map((obj2)=>{
                return obj2.base_stat
            })
            // console.log(t)
            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "hp": z[0]// data.stats[0].stat.name
            });
        })
    });




    // res.json({
    //     "k1": "v1",

    //     "k2": "v1",

    //     "k3": "v1"

    // })
})


// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "/index.html");
//   })

app.use(express.static('./public'));


