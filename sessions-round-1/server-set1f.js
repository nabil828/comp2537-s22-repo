const express = require('express')
const app = express()

var session = require('express-session')

// Use the session middleware
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

function auth(req, res, next){
    console.log("/ home route got triggered!")
    if (req.session.authenticated)
       next()
    else {
        res.redirect('/login')
    }
    
}

function logger1 (req, res, next){
    console.log("logger1 got executed!")
    next()
}

function logger2 (req, res, next){
    console.log("logger2 got executed!")
    next()
}

function logger3 (req, res, next){
    console.log("logger3 got executed!")
    next()
}
// how to declare a global middleware
app.use(logger2)
app.use(logger1)



users = [
    {
        username: "user1",
        password: "pass1",
        shoppingCart: [
            {
                pokeID: 25,
                price: 12,
                quantity: 2
            },{
                
                pokeID: 35,
                price: 12,
                quantity: 4
            }
        ]
    },{

        username: "user2",
        password: "pass2"
    }
]


app.listen(5000, function (err) {
    if (err) console.log(err);
})

app.get('/', function (req, res) {
   res.send("Welcome to the Home page!")
})

app.get('/userProfile/:name', auth, function(req, res){
    tmp = ''
    tmp += `Welcome ${req.params.name}`
    
    tmp += JSON.stringify(users.filter(  x => x.username == req.params.name)[0].shoppingCart)
    res.send()
})


app.get('/login/', logger3, function (req, res, next) {
    res.send("Please provide the credentials through the URL")
    
})

app.get('/login/:user/:pass', function (req, res, next) {
    if (
        users.filter(
                user => user.username == req.params.user
            )
            [0].password 
        == 
        req.params.pass
    ) {
    // if (users[req.params.user] == req.params.pass) {
        req.session.authenticated = true
        req.session.user = req.params.user
        // res.send("Successful Login!")
        res.redirect(`/userProfile/${req.session.user}`)
    } else {
        req.session.authenticated = false
        res.send("Failed Login!")
    }

})
