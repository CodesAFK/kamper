var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');

const server = 1337;

mongoose.connect("mongodb://localhost/kamper");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// TEMP SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name:  String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


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

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

// =============================
// POST Routes                ==
// =============================

app.post('/campgrounds', function(req, res){
  var name = req.body.campgroundName;
  var image = req.body.campgroundImg;
  var newCampground = {name:name, image:image};
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