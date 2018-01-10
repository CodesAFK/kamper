
var express    = require('express'),
    router     = express.Router(),
    Campground = require('../models/campground'),
    Comment    = require('../models/comment');


// =============================
// GET Routes                 ==
// =============================

router.get("/", function (req, res) {

    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render('campgrounds/campgrounds', {campgrounds: allCampgrounds});
        }
    });

});

// =================NEW CAMPGROUND=================

router.get('/new', isLoggedIn, function (req, res) {
    res.render('campgrounds/new');
});

// ====================SHOW PAGE FOR CAMPGROUND====

router.get('/:id', function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {

            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// =============================
// EDIT CAMPGROUND            ==
// =============================

router.get('/:id/edit', function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      }else{
          res.render('campgrounds/edit', {campground:foundCampground});
      }
  });

});

router.put('/:id', function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           console.log(err);
           res.redirect('/campgrounds');
       } else {
           res.redirect('/campgrounds/' + req.params.id);
       }
   })
});
// =============================
// POST Routes                ==
// =============================

router.post('/', isLoggedIn, function (req, res) {
    var name          = req.body.campgroundName,
        image         = req.body.campgroundImg,
        desc          = req.body.description,
        author        = {id: req.user._id, username: req.user.username},
        newCampground = {name: name, image: image, description: desc, createdBy:author};
// Create new campground in db
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


//  CHECK USER LOGIN

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;