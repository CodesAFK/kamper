var express           = require('express'),
    app               = express(),
    mongoose          = require('mongoose'),
    bodyParser        = require('body-parser'),
    Campground        = require('./models/campground'),
    passport          = require('passport'),
    LocalStrategy     = require('passport-local'),
    Comment           = require("./models/comment"),
    User              = require("./models/user"),
    seedDB            = require("./seeds");

const server = 1337;

mongoose.connect("mongodb://localhost/kamper");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// =============================
// == PASSPORT CONFIGURATION  ==
// =============================

app.use(require('express-session')({
    secret:"This isn't the deployment secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


seedDB();
// =============================
// GET Routes                 ==
// =============================

app.get('/', function(req, res){
    res.render('home');
});

app.get("/campgrounds", function(req, res){

    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
           res.render('campgrounds/campgrounds', {campgrounds:allCampgrounds});
        }
    });

});

// =================NEW CAMPGROUND=================

app.get('/campgrounds/new', function(req, res){
    res.render('campgrounds/new');
});

// ====================SHOW PAGE FOR CAMPGROUND===========

app.get('/campgrounds/:id', function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {

            res.render('campgrounds/show', {campground:foundCampground});
        }
    });
});

// =============================
// POST Routes                ==
// =============================

app.post('/campgrounds', function(req, res){
  var name          = req.body.campgroundName;
  var image         = req.body.campgroundImg;
  var desc          = req.body.description;
  var newCampground = {name:name, image:image, description:desc};
  // Create new campground in db
  Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else {
          res.redirect("/campgrounds");
      }
  });
});

// =============================
//   COMMENTS ROUTES          ==
// =============================

//  NEW ROUTE

app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
          console.log(err);
      } else {
          res.render("comments/new",{campground:foundCampground});
      }
   });
});

// =============================
//   COMMENTS POST ROUTES     ==
// =============================

app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
                   res.redirect("/campgrounds");
               } else {

                    campground.comments.push(comment);
                    campground.save();

                   res.redirect("/campgrounds/"+ campground._id);
               }
            });
        }
    });
});


// =============================
// ==       AUTH ROUTES       ==
// =============================

app.get('/register', function(req, res){
    res.render('register');
});

//  Register Post Req

app.post('/register', function(req, res){
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

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', passport.authenticate('local',
    {

        successRedirect: "/campgrounds",
        failureRedirect: "/login"

    }), function (req, res){

});


//  LOGOUT

app.get('/logout', function(req, res){
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


// =============================
// Start Server               ==
// =============================

app.listen(server, function(){
   console.log("Server started on " + server);
});