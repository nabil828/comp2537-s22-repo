const express = require('express')
const app = express()

var session = require('express-session')

// Use the session middleware
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

function auth1(req, res, next) {
    if (req.session.authenticated)
        next()
    else {
        res.redirect('/login')
    }
}

function logger1(req, res, next) {
    console.log("logger1 function got executed!")
    next()
}

function logger2(req, res, next) {
    console.log("logger2 function got executed!")
    next()
}

// how to declare a global middleware

// app.use(logger2)
// app.use(logger1)
users = [
    {
        username: "user1",
        password: "pass1",
        shoppingCart: [
            {
                pokeCardID: 25,
                quantity: 2,
                price: 24.2
            },{
                
                pokeCardID: 30,
                quantity: 1,
                price: 12
            }
        ]
    }, {
        username: "user2",
        password: "pass2"
    }
]



app.listen(5000, function (err) {
    if (err) console.log(err);
})

app.get('/', auth1, function (req, res) {
    res.send('Welcome to the home page')
})


app.get('/userProfile/:name', auth1, function (req, res) {
    res.write(`Welcome ${req.params.name}`)
    // shopping cart
    x = function (obj){
        return obj.username = req.params.name
    }
    
    res.write(JSON.stringify(users.filter(x)[0].shoppingCart))
    res.send()
})



app.get('/login/', function (req, res, next) {
    res.send("Please provide the credentials through the URL")
})

app.get('/login/:user/:pass', function (req, res, next) {
    if (users.filter( (user) => {return user.username == req.params.user})[0].password == req.params.pass)
    // if (users[req.params.user] == req.params.pass) 
    {
        req.session.authenticated = true
        req.session.user = req.params.user
        // res.send("Successful Login!")
        res.redirect(`/userProfile/${req.session.user}`)
    } else {
        req.session.authenticated = false
        res.send("Failed Login!")
    }

})
