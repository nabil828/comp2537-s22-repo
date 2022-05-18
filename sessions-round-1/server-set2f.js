const express = require('express')
const app = express()

var session = require('express-session');
const { use } = require('express/lib/application');

// Use the session middleware
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

users = [
    {
        username : "user1",
        password: "pass1",
        shoppingCart:[
            {
                pokeID: 25,
                price : 13,
                quantity: 2
            },{

                pokeID: 35,
                price : 40,
                quantity: 5
            }
        ]
        
    },{

        username : "user2",
        password: "pass2"
    }
]

function logger1(x, y, next) {
    console.log("logger1 function got executed!")
    next()
}

function logger2(x, y, next) {
    console.log("logger2 function got executed!")
    next()
}

function logger3(x, y, next) {
    console.log("logger3 function got executed!")
    next()
}
function auth(req, res, next) {
    if (req.session.authenticated) {
        next()
        console.log("dsaasd")
    }
    else {
        res.redirect('/login')
    }

}
// how you declarea a global middleware
app.use(logger1)
app.use(logger2)

app.listen(5000, function (err) {
    if (err) console.log(err);
})

app.get('/', auth, function (req, res) {
    console.log("/ home route got triggerd!")
    tmp = ''
    tmp += `Hi ${req.session.user} !`
    tmp += "Welcome to the home page"
    res.send(tmp)
})

app.get('/userProfile/:x', auth, function (req, res) {
    tmp = ''
    tmp += `Hi ${req.params.x} !`
    tmp += JSON.stringify(users.filter(user => user.username == req.params.x)[0].shoppingCart)
    res.send(tmp)
})



app.get('/login/', logger3, function (req, res, next) {
    console.log("the callback function of /login")
    res.send("Please provide the credentials through the URL")
})

app.get('/login/:user/:pass', function (req, res, next) {
    function hh (y) {
        return y.username == req.params.user
    }
    if(users.filter( hh)[0].password == req.params.pass){
    // if (users[req.params.user] == req.params.pass) {
        req.session.authenticated = true
        req.session.user = req.params.user
        // res.send("Successful Login!")
        res.redirect(`/userProfile/${req.params.user}`)
    } else {
        req.session.authenticated = false
        res.send("Failed Login!")
    }

})
