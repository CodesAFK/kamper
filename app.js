var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    Campground  = require('./models/campground'),
    seedDB      = require("./seeds");

const server = 1337;

mongoose.connect("mongodb://localhost/kamper");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

seedDB()

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
           res.render('campgrounds', {campgrounds:allCampgrounds});
        }
    });

});

// =================NEW CAMPGROUND=================

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

// ====================SHOW PAGE FOR CAMPGROUND===========

app.get('/campgrounds/:id', function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render('show', {campground:foundCampground});
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
// Start Server               ==
// =============================

app.listen(server, function(){
   console.log("Server started on " + server);
});