const express = require('express')
const app = express()

var session = require('express-session')

// Use the session middleware
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

users = [
    {
        username: "user1",
        password: "pass1",
        shoppingCart: [
            {
                pokeID: 25,
                quantity: 2,
                price: 32
            },
            {
                pokeID: 21,
                quantity: 4,
                price: 16
            }
        ]
    },
    {
        username: "user2",
        password: "pass2"
    },
]

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

app.get('/userProfile/:name', function (req, res) {
    res.write(`Welcome ${req.params.name}`)
    res.write(`<br>`)
    // console.log(users.filter( user => user.username == req.params.name))
    res.write(JSON.stringify(
                 users.filter(user => user.username == req.params.name)[0].shoppingCart[0]
        )
        )
res.send()
})

app.get('/', auth, function (req, res) {
    console.log("/ route got accessed!")
    res.send(`Welcome <a href="/userProfile/${req.session.user}"> ${req.session.user} </a>`)

})


app.get('/login/', function (req, res, next) {
    res.send("Please provide the credentials through the URL")
})

app.get('/login/:user/:pass', function (req, res, next) {

    if (users.filter(user => user.username == req.params.user)[0].password == req.params.pass)
    // [req.params.user] == req.params.pass)
    {
        req.session.authenticated = true
        req.session.user = req.params.user
        res.send("Successful Login!")
    } else {
        req.session.authenticated = false
        res.send("Failed Login!")
    }

})
