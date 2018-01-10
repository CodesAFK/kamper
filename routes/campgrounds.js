
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
// POST Routes                ==
// =============================

router.post('/', isLoggedIn, function (req, res) {
    var name = req.body.campgroundName;
    var image = req.body.campgroundImg;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
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