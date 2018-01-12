var express    = require('express'),
    router     = express.Router({mergeParams:true}),
    Campground = require('../models/campground'),
    Comment    = require('../models/comment');






//  COMMENTS NEW

router.get('/new', isLoggedIn, function(req, res){
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

router.post('/', isLoggedIn, function(req, res){
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
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();

                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});

//COMMENT EDIT

router.get('/:comment_id/edit', function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment:foundComment});
        }
    });

});

//COMMENT UPDATE

router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment.text, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            updatedComment.text = req.body.comment.text;
            updatedComment.save();
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//CHECK USER LOGIN

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;