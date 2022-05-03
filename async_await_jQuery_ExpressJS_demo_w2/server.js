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

app.get('/profile/:id', function (req, res) {
    // console.log(req);
 
    // res.render("profile.ejs", {
    //     "id": req.params.id,
    // });   

    res.json({
        "k1": "v1",
        
        "k2": "v1",
        
        "k3": "v1"

    })
})


// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "/index.html");
//   })

app.use(express.static('./public'));


