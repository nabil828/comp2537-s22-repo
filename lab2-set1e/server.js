const express = require('express')
const app = express()
app.set('view engine', 'ejs');

app.listen(5000, function (err) {
    if (err)
        console.log(err);
})   

app.get('/search', function (req, res) {
    res.sendFile(__dirname + "/public/search.html");
})

const https = require('https');

app.get('/profile/:id', function (req, res) {
    // console.log(req);
 
    
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`

    https.get(url, function (https_res) {
        data = '';
        https_res.on("data", function (chunk) {
            // console.log(chunk);
            data += chunk
        })

        https_res.on('end', function () {
            data = JSON.parse(data)
            // console.log(data)

           
            console.log(hp_)
            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "img_path": data.sprites.other["official-artwork"]["front_default"],
                "hp": hp_[0]

                
            });
        })
    })


     

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


