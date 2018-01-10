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

var commentsRoute     = require("./routes/comments");
var campgroundsRoute  = require("./routes/campgrounds");
var authRoute         = require("./routes/index");

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


// Share current user across pages
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds/:id/comments", commentsRoute);
app.use("/campgrounds", campgroundsRoute);
app.use(authRoute);


// =============================
// Start Server               ==
// =============================

app.listen(server, function(){
   console.log("Server started on " + server);
});

