OrderStatus = {
    NOTCONFIRMED: 'notConfirmed', 
    PLACED: 'placed'
}

const express = require('express')
const app = express()

var session = require('express-session')

// Use the session middleware
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
// app.use(logger1);
// app.use(logger2);


// users = {
//     "user1": "pass1",
//     "user2": "pass2",
// }

users= [
    { id: 1, name: 'user1', pass: 'pass1'},
    { id: 2, name: 'user2', pass: 'pass2' },
    { id: 3, name: 'user3', pass: 'pass3' }
]

shoppingCarts = [
    { 
        id: 1, name: "user1's Project", userId: 1,
        orders: [
            {
                PokeID: 25,
                price: 75.2,
                quantity: 2, 
                status: OrderStatus.NOTCONFIRMED
            },
            {
                PokeID: 35,
                price: 20.122,
                quantity: 10,
                status: OrderStatus.PLACED
            }
        ]
    },
    { id: 2, name: "user2's Project", userId: 2 },
    { id: 3, name: "user3's Project", userId: 3 }
]



app.listen(5000, function (err) {
    if (err) console.log(err);
})
// app.get('/test1', logger1, logger2, function (req, res) {
//     res.send('test1')
// })

// app.get('/test2', logger2,  logger1, function (req, res) {
//     res.send('test2')
// })

app.get('/userProfile/:id', auth, (req,res)=>{
    list_ = shoppingCarts.filter(
        cart => cart.userId == users.filter(
            user => user.name == req.session.user)[0].id)
    res.send(list_)
})

app.get('/', function (req, res) {
    console.log("home page")
    // res.write('Home Page!')
    // res.end(`Hi ${req.session.user} !`)
    res.send("home page!")
})

app.get('/login/', function (req, res, next) {
    res.send("Please provide the credentials through the URL")
})

app.get('/login/:user/:pass', function (req, res, next) {
    if(users.filter(user => user.name == req.params.user)[0].pass == req.params.pass){
    // if (users[req.params.user] == req.params.pass) {
        req.session.authenticated = true
        req.session.user = req.params.user
        res.send("Successful Login!")
    } else {
        req.session.authenticated = false
        res.send("Failed Login!")
    }

})

// function logger1(req, res, next){
//     console.log("logger1 middleware has been executed")
//     next() 
// }

// function logger2(req, res, next){
//     console.log("logger2 middleware has been executed")
//     next()
// }


function auth(req, res, next) {
    console.log("auth middleware has been executed")
    if (req.session.authenticated) {
        next()
        console.log("test")
    }
    else {
        res.redirect('/login')
    }
}