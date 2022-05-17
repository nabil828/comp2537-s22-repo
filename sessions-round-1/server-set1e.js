const express = require('express')
const app = express()

var session = require('express-session')

// Use the session middleware
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

users = {
    "user1": "pass1",
    "user2": "pass2",
}

// declaring a global middleware
app.use(logger1)

function logger1(req, res, next) {
    console.log("logger1 function got executed!");
    next()
    console.log("Bye from logger1 function!")
}

function auth(req, res, next) {
    console.log("logger2 function got executed!");
    if (req.session.authenticated)
        next()
    else {
        res.redirect('/login')
    }

}

app.listen(5000, function (err) {
    if (err) console.log(err);
})

app.get('/', auth, function (req, res) {
    console.log("/ route got accessed!")
    res.send(`Welcome ${req.session.user}`)

})


app.get('/login/', function (req, res, next) {
    res.send("Please provide the credentials through the URL")
})

app.get('/login/:user/:pass', function (req, res, next) {
    if (users[req.params.user] == req.params.pass) {
        req.session.authenticated = true
        req.session.user = req.params.user
        res.send("Successful Login!")
    } else {
        req.session.authenticated = false
        res.send("Failed Login!")
    }

})
