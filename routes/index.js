var express    = require('express'),
    router     = express.Router(),
    Campground = require('../models/campground'),
    Comment    = require('../models/comment'),
    User       = require('../models/user'),
    passport   = require('passport');

// =============================
// ==       INDEX ROUTE       ==
// =============================


router.get('/', function (req, res) {
    res.render('home');
});


// =============================
// ==       AUTH ROUTES       ==
// =============================

router.get('/register', function(req, res){
    res.render('register');
});

//  Register Post Req

router.post('/register', function(req, res){
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect('/campgrounds');
        });
    });
});

//   LOGIN FORM GET/POST

router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', passport.authenticate('local',
    {

        successRedirect: "/campgrounds",
        failureRedirect: "/login"

    }));



//  LOGOUT

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds');
});

// =============================
// Homegrown Middleware       ==
// =============================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}



module.exports = router;